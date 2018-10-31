import echarts from './echarts.min';
import toString from '../../util/toString';

export default function renderChart(props) {
  const height = props.height ? `${props.height || 400}px` : '100%';
  const width = props.width ? `${props.width}px` : 'auto';
  // console.log('option:', toString(props.option), props.option);
  return `
    document.getElementById('main').style.height = "${height}";
    document.getElementById('main').style.width = "${width}";
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${JSON.stringify(props.option)});
    myChart.on('click', function(params) {
      var seen = [];
      var paramsString = JSON.stringify(params, function(key, val) {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      });
      window.postMessage(paramsString);
    });
  `;
}
