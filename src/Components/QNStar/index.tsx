import * as React from 'react';
import { View, Image } from 'react-native';
import EStylesheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

type Props = {
  // 星星数量
  stars: number
}
export default class QNStar extends React.Component<Props> {

  public render() {
    console.log(this.props.stars, '------------');
    return (
      <View style={styles.starsContainer}>
        {this.renderLightStar()}
        {this.renderHalfStar()}
        {this.renderDarkStar()}
      </View>
    )
  }

  public renderLightStar() {
    const createlightStartArray = this.createlightStartArray(this.props.stars);
    return createlightStartArray.map((star, index) => {
      return (
        <Image key={index} source={require('./assets/images/star-light.png')} style={styles.star}/>
      )
    })
  }

  public renderDarkStar() {
    let totalStarsNum = Math.ceil(this.props.stars);
    const createDarkStartArray = this.createlightStartArray(Math.abs(5-totalStarsNum));
    return createDarkStartArray.map((star, index) => {
      return (
        <Image key={index} source={require('./assets/images/star-dark.png')} style={styles.star}/>
      )
    })
  }

  public renderHalfStar() {
    if(!/^\d+$/.test(this.props.stars)) {
      return (
        <Image source={require('./assets/images/star-half.png')} style={styles.star}/>
      )
    }
  }

  public createlightStartArray(stars: number): Array<any> {
    let lightStarsNum = parseInt(stars);
    let startArray = new Array(lightStarsNum);
    for(let i = 0; i < lightStarsNum; i ++) {
      startArray[i] = 0;
    }
    return startArray;
  }
}
const styles = EStylesheet.create({
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: pxToDp(25),
    height: pxToDp(24),
    marginRight: pxToDp(8),
  }
})