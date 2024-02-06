import {View, Modal, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Loader from '../../assets/animation/AnimationLoad.json';

interface Props {
  loading: boolean;
}

const AppLoad = ({loading}: Props) => {
  return (
    <Modal transparent={true} animationType={'none'} visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {/* <ActivityIndicator animating={loading} size="small" color="green" /> */}
          <LottieView style={styles.lottieView} source={Loader} autoPlay loop />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 100,
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  lottieView: {
    height: 150,
    width: 150,
  },
});

export default AppLoad;
