import * as React from 'react';
import { View, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default class extends React.PureComponent {
  render() {
    return (
      <View style={styles.projectWrapper}>
        <View style={styles.projectHead}>
          <View style={styles.projectHeadLeft}>
            <View style={styles.projectLogo}>
              <Image
                source={{
                  uri:
                    'https://upload-images.jianshu.io/upload_images/2759192-e06b647fc555892f.jpg'
                }}
                style={styles.projectLogoIcon}
              />
            </View>
            <View style={styles.projectDescContainer}>
              <View style={styles.projectTop}>
                <Text style={styles.projectName}>208</Text>
              </View>
              <Text style={styles.projectDesc}>返现金额(元)</Text>
            </View>
          </View>
          <View style={styles.projectHeadRight}>
            <View style={styles.projectHeadRightItem}>
              <Image
                source={require('../../assets/images/icon_pre.png')}
                style={styles.projectBadgeIcon}
              />
              <Text style={styles.projectDesc}>已预付返现金额</Text>
            </View>
            <View style={styles.projectHeadRightItem}>
              <Image
                source={require('../../assets/images/icon_shield.png')}
                style={styles.projectBadgeIcon}
              />
              <Text style={styles.projectDesc}>已预付返现金额</Text>
            </View>
          </View>
        </View>
        <View style={styles.projectBody}>
          <View style={styles.projectDetail}>
            <View style={styles.projectDetailItem}>
              <Text style={styles.projectDetailItemK}>{10}</Text>
              <Text style={styles.projectDetailItemV}>债转金额(元)</Text>
            </View>
            <View style={styles.projectDetailItem}>
              <Text style={styles.projectDetailItemK}>{1}</Text>
              <Text style={styles.projectDetailItemV}>返现金额(元)</Text>
            </View>
            <View style={styles.projectDetailItem}>
              <Text style={styles.projectDetailItemK}>{1}</Text>
              <Text style={styles.projectDetailItemV}>剩余期限(天)</Text>
            </View>
            <View style={styles.projectDetailItem}>
              <Text style={styles.projectDetailItemK}>{1}</Text>
              <Text style={styles.projectDetailItemV}>还款方式(元)</Text>
            </View>
          </View>
        </View>
        <View style={styles.tagContainer}>
          <View style={styles.tagItemContainer}>
            <Text style={styles.tagDesc}>有效期一天</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  projectWrapper: {
    width: '100%',
    marginTop: pxToDp(18),
    paddingHorizontal: pxToDp(31),
    paddingTop: pxToDp(61),
    paddingBottom: pxToDp(16),
    borderRadius: pxToDp(10),
    backgroundColor: '#fff'
  },
  projectHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: pxToDp(45),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#EAEAEA'
  },
  projectHeadLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  projectHeadRight: {
    paddingTop: pxToDp(10)
  },
  projectHeadRightItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: pxToDp(21)
  },
  projectHeadRightStatus: {
    marginRight: pxToDp(5),
    color: '#a9a9a9',
    fontSize: pxToDp(22)
  },
  projectTrendIcon: {
    width: pxToDp(20),
    height: pxToDp(20)
  },
  projectLogo: {
    marginRight: pxToDp(25),
    paddingTop: pxToDp(10)
  },
  projectLogoIcon: {
    width: pxToDp(80),
    height: pxToDp(80),
    borderRadius: pxToDp(10),
    borderColor: '#000'
  },
  projectTop: {
    flexDirection: 'row',
    marginBottom: pxToDp(16)
  },
  projectName: {
    fontSize: pxToDp(56),
    color: '#333'
  },
  projectBadgeIcon: {
    width: pxToDp(31),
    height: pxToDp(31),
    marginRight: pxToDp(9)
  },
  projectDesc: {
    fontSize: pxToDp(24),
    fontWeight: '500',
    color: '#a9a9a9'
  },
  projectDetail: {
    flexDirection: 'row',
    width: '100%',
    height: pxToDp(175),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  projectDetailItem: {},
  projectDetailItemK: {
    fontSize: pxToDp(36),
    color: '#333333'
  },
  projectDetailItemV: {
    marginTop: pxToDp(21),
    fontSize: pxToDp(20),
    color: '#A9A9A9'
  },
  // tag
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  tagItemContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: pxToDp(48),
    borderBottomLeftRadius: pxToDp(48),
    backgroundColor: '#ffe7c1',
    marginRight: -pxToDp(31)
  },
  tagDesc: {
    width: pxToDp(148),
    height: pxToDp(48),
    color: '#ffad2c',
    fontWeight: '500',
    fontSize: pxToDp(22),
    textAlign: 'center',
    lineHeight: pxToDp(48)
  }
});
