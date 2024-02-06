import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import * as Icon from 'react-native-feather';
import {getFont} from '../../utils/functions';
import R from '../../assets/R';
import {IAccount} from '../../store/StoreComponents/Account';
import Clipboard from '@react-native-clipboard/clipboard';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
  setModalVisibleAccountDetails: SetStateFunction<boolean>;
  accountDetails: IAccount;
}

const ModalQRCodeAccount = ({
  modalVisible,
  setModalVisible,
  setModalVisibleAccountDetails,
  accountDetails,
}: Props) => {
  const [isCoppy, setIsCoppy] = useState(false);

  const coppy = () => {
    setIsCoppy(true);
    Clipboard.setString(accountDetails.address);
    setTimeout(() => {
      setIsCoppy(false);
    }, 500);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalVisibleAccountDetails(true);
  };

  const handleModalPress = (event: any) => {
    // Check if the click event target is the modal content
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={handleModalPress}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHearder}>
              <TouchableOpacity onPress={closeModal}>
                <View style={styles.lineBack} />
              </TouchableOpacity>
              <Text style={styles.label}>QR CODE</Text>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.QRCodeStyle}>
                <QRCode
                  value={accountDetails.address}
                  size={200}
                  color="white"
                  backgroundColor="black"
                />
              </View>
              <Text style={[styles.text, {fontSize: getFont(22)}]}>
                {accountDetails.name}
              </Text>
              <View style={styles.flex}>
                <Text style={[styles.text]}>
                  {accountDetails.address.slice(0, 6)}...
                  {accountDetails.address.slice(-4)}
                </Text>
                <TouchableOpacity onPress={coppy}>
                  {!isCoppy ? (
                    <Icon.Copy color="white" style={{marginLeft: 8}} />
                  ) : (
                    <Icon.CheckCircle color="white" style={{marginLeft: 8}} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    top: '30%',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: R.colors.color_tone_2,
    paddingBottom: 10,
  },
  modalHearder: {
    paddingVertical: 6,
    alignItems: 'center',
    width: '100%',
    backgroundColor: R.colors.color_tone_3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    flex: 1,
    width: '100%',
    backgroundColor: R.colors.color_tone_2,
    paddingBottom: 10,
    alignItems: 'center',
  },
  lineBack: {
    width: '20%',
    backgroundColor: 'black',
    borderRadius: 5,
    paddingHorizontal: '12%',
    paddingVertical: 4,
    marginVertical: 4,
  },
  label: {
    color: 'white',
    fontWeight: '400',
    fontSize: getFont(20),
    textAlign: 'center',
    paddingVertical: 8,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: getFont(18),
    fontWeight: '400',
    color: 'white',
  },
  QRCodeStyle: {
    marginVertical: 10,
  },
});

export default ModalQRCodeAccount;
