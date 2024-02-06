import {View, Text, StyleSheet, Modal, Image} from 'react-native';
import React, {useEffect} from 'react';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import R from '../../assets/R';
import {HEIGHT, WIDTH} from '../../utils/functions';
import Button from '../Button';
import smartcard from '../../nfc/smartcard';

interface Props {
  modalVisible: boolean;
  setModalVisible: (a: boolean) => void;
  func: () => Promise<void>;
}

const ModalNFC = ({modalVisible, setModalVisible, func}: Props) => {
  const cancel = async () => {
    setModalVisible(false);
    await NfcManager.cancelTechnologyRequest();
  };
  const nfc = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.IsoDep);
      const isChannel: boolean = await smartcard.SecureChannel();
      console.log('SecureChannel', isChannel);
      await func();
    } catch (error) {
      console.log('nfc', error);
    } finally {
      await NfcManager.cancelTechnologyRequest();
      setModalVisible(false);
    }
  };
  useEffect(() => {
    if (modalVisible) {
      nfc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.containerContent}>
          <View style={styles.modalView}>
            <Image style={styles.img} source={R.images.ScanCardIcon} />
            <Text style={styles.textStyle}>SCAN YOUR CARD TO {'\n'} LOGIN</Text>
            <Button
              name="Cancel"
              func={cancel}
              width={WIDTH(80)}
              height={HEIGHT(40)}
              mt={10}
              colorButton={R.colors.color_tone_5}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    justifyContent: 'flex-end',
  },
  modalView: {
    marginBottom: 30,
    marginHorizontal: 10,
    backgroundColor: R.colors.color_tone_1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: '#EEC140',
    marginTop: 20,
    fontWeight: '400',
    fontSize: 22,
    textAlign: 'center',
  },
  img: {
    height: HEIGHT(134),
    width: WIDTH(120),
  },
});

export default ModalNFC;
