import * as React from 'react';
import { Text, View } from 'react-native';
import Placeholder from 'rn-placeholder';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

const customPlaceholder = props => {
  let PlaceholderContent = [];
  for (var i = 0; i < props.lineNumber; i++) {
    PlaceholderContent.push(
      <View key={i} style={styles.listItem}>
        <Placeholder.ImageContent
          position="right"
          lineNumber={2}
          textSize={16}
          lineSpacing={15}
          color="#eeeeee"
          width="100%"
          lastLineWidth="40%"
          firstLineWidth="20%"
          animate=""
        />
      </View>
    );
  }
  return <View style={styles.listItemContainer}>{PlaceholderContent}</View>;
};

const styles = EStyleSheet.create({
  listItemContainer: {
    backgroundColor: '#fff',
    paddingLeft: pxToDp(38),
    paddingRight: pxToDp(38)
  },
  listItem: {
    height: pxToDp(182),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#EAEAEA',
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(40)
  }
});
export default Placeholder.connect(customPlaceholder);
