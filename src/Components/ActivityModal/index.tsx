import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import {extendShallowObservable, toJS} from 'mobx'
import Modal from "react-native-simple-modal"
import {pxToDp} from "~utils"

const styles = EStyleSheet.create({
  containerStyle: {
    justifyContent: 'center'
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  activityContainer: {justifyContent: 'center', flex: 1, flexDirection: 'column', alignItems: 'center'},
  activityImage: {width: 300, height: 500},
  activityClose: {width: pxToDp(60), height: pxToDp(60)}
})

@inject('RootStore')
@observer
export default class ActivityModal extends React.Component {
  constructor(props) {
    super(props)
  }
  public render() {
    return (
      <Modal
        open={this.props.RootStore.isOpenActivityModal}
        containerStyle={styles.containerStyle}
        modalStyle={styles.modalContent}
      >
        <TouchableOpacity style={styles.activityContainer}>
          <Image source={{uri: 'https://wsimages.wsloan.com/images/ah-20/608673735926375467IxC1I3U_9XS8RacNmR5st.png'}}
                 style={styles.activityImage} resizeMode={'contain'}></Image>
          <TouchableOpacity style={{width: '100%', flexDirection: 'row', justifyContent: 'center', position: 'relative', top: pxToDp(-80)}}>
            <Image resizeMode={'contain'}
                   style={styles.activityClose}
                   source={require('./asset/image/activity_close.png')}></Image>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }
}