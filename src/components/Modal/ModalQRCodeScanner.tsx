import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  Easing,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {RNCamera} from 'react-native-camera';
import * as Icon from 'react-native-feather';
import {HEIGHT, WIDTH} from '../../utils/functions';

const {width} = Dimensions.get('window');

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
  setValue: SetStateFunction<string>;
}

const ModalQRCodeScanner = ({
  modalVisible,
  setModalVisible,
  setValue,
}: Props) => {
  const [isCameraActive, setCameraActive] = useState(false);
  const animatedValue = new Animated.Value(0);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const handleBarCodeRead = (result: any) => {
    console.log('QR Code Scanned:', result.data);
    setValue(result.data);
    onClose();
  };

  useEffect(() => {
    if (modalVisible) {
      setCameraActive(true);
      startAnimation();
    } else {
      setCameraActive(false);
      animatedValue.setValue(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible]);

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <RNCamera
          style={styles.camera}
          onBarCodeRead={handleBarCodeRead}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}>
          <View style={styles.overlay}>
            <View style={styles.topOverlay}>
              <TouchableOpacity onPress={onClose}>
                <Icon.ArrowRight
                  color="white"
                  width={WIDTH(40)}
                  height={HEIGHT(40)}
                />
              </TouchableOpacity>
              <Text style={styles.title}>Quét mã QR</Text>
            </View>
            <View style={styles.middleOverlay}>
              <View style={styles.leftAndRightOverlay} />
              <View style={styles.cameraContainer}>
                <View style={styles.maskOuter}>
                  <View style={styles.mask}>
                    <Animated.View
                      style={[
                        styles.scanLine,
                        {
                          transform: [
                            {
                              translateY: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 220],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.leftAndRightOverlay} />
            </View>
            <View style={styles.bottomOverlay} />
          </View>
        </RNCamera>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'space-between',
    padding: 16,
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    height: 30,
    width: 60,
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  middleOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  leftAndRightOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  cameraContainer: {
    flex: 3,
  },
  maskOuter: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    width: width * 0.6,
    height: width * 0.55,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'white',
    overflow: 'hidden',
  },
  scanLine: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(0, 255, 0, 0.7)',
  },
});

ModalQRCodeScanner.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default ModalQRCodeScanner;
