import * as React from 'react';
import { View, TextInput, Image, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { pxToDp } from '~utils';

type Props = {
  navigation: any
}

class SearchComponent extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.searchBoxView}>
        <TouchableWithoutFeedback onPress={() => { this.toInvestDetail() }}>
          <View style={styles.searchBox}>
            <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
            <Text style={styles.searchTxt}>
              搜一搜~
          </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  toInvestDetail() {
    this.props.navigation.navigate('Search');
  }
}

const styles = StyleSheet.create({
  searchBoxView: {
    marginBottom: pxToDp(1),
    paddingTop: pxToDp(10),
    paddingBottom: pxToDp(16),
    paddingLeft: pxToDp(32),
    paddingRight: pxToDp(32),
    backgroundColor: '#fff',
  },
  searchBox: {
    height: pxToDp(64),
    paddingLeft: pxToDp(32),
    marginTop: pxToDp(10),
    borderRadius: pxToDp(30),
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: pxToDp(24),
    height: pxToDp(24)
  },
  searchTxt: {
    marginLeft: pxToDp(25),
    fontSize: pxToDp(26),
    color: "#B7B6B6"
  }
});

export default SearchComponent;