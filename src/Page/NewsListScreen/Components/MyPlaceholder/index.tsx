import * as React from 'react'
import {
  View, Text, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native'
import Placeholder from 'rn-placeholder'
import {pxToDp} from "~utils"

export default class MyPlaceholder extends React.Component {
  constructor(props) {
    super(props)
  }
  _renderPlaceholderItem = (i) => {
    return (
      <View key={i}>
        <View style={[{marginTop: pxToDp(46),
          marginLeft: pxToDp(32),
          marginRight: pxToDp(13)}]}>
          <Placeholder.Paragraph
            textSize={28}
            lineNumber={1}
            lineSpacing={12}
          >
          </Placeholder.Paragraph>
        </View>
        <View style={[{
          marginTop: pxToDp(20),
          marginLeft: pxToDp(109),
          marginRight: pxToDp(13)}]}>
          <Placeholder.Paragraph
            textSize={14}
            lineNumber={this.props.status ? 1 : 4}
            lineSpacing={14}
          >
          </Placeholder.Paragraph>
        </View>
      </View>
    )
  }
  _renderPlaceholder = () => {
    let placeholderContent = []

    for(let i = 0; i< this.props.lineNumber; i++) {
      placeholderContent.push(this._renderPlaceholderItem(i))
    }
    return(
      placeholderContent
    )
  }
  public render() {
    return this._renderPlaceholder()
  }
}