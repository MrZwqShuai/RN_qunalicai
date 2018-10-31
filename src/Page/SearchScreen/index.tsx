import * as React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import SearchHeaderComponent from './components/search-header/index';
import SearchRecommendComponent from './components/search-recommend/index';
import { inject, observer } from 'mobx-react';

@inject('RootStore')
@observer
class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  render() {
    return (
      <View
        style={{
          height: Dimensions.get('window').height,
          backgroundColor: '#F8F8F8'
        }}>
        <SearchHeaderComponent navigation={this.props.navigation} />
        <ScrollView>
          <SearchRecommendComponent navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}

export default SearchScreen;
