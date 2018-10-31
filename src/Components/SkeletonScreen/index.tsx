import * as React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import createSkeletonScreen from './main';

type Props = {
  length: number;
}
class SkeletonScreen extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    let arr = [];
    for(let i = 0; i < this.props.length; i++) {
      arr.push("");
    }
    const skeletonScreen = arr.map((item, index) => {
      return (
        <View key={index}>
         {this.props.children}
        </View>
      )
    })
    return (
      <View>
        {skeletonScreen}
      </View>
    )
  }
}


const MySkeleton = createSkeletonScreen(SkeletonScreen);

export default MySkeleton;