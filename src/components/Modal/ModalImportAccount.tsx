import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import * as Icon from 'react-native-feather';
import R from '../../assets/R';
import {HEIGHT, WIDTH, getFont} from '../../utils/functions';
import {TextInput} from 'react-native-gesture-handler';
import {VerifyPin, ImportAccount} from '../../nfc/wallet';
import ModalEnterPIN from './ModalEnterPIN';
import Button from '../Button';
import ModalScanNFC from './ModalScanNFC';
import axiosInstance from '../../utils/axios/axios';
import {Wallet} from 'ethers';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {
  setAccountSelect,
  setAccounts,
} from '../../store/StoreComponents/account';
// import {showNotification} from '../../utils/showNotification';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

const dataSelect = ['Private Key', '12 word phrases'];

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
  setModalVisibleAccounts: SetStateFunction<boolean>;
}

const ModalImportAccount = ({
  modalVisible,
  setModalVisible,
  setModalVisibleAccounts,
}: Props) => {
  const [hide, setHide] = useState(false);
  const [pin, setPin] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [checkPrivateKey, setCheckPrivateKey] = useState('');
  const [modalVisiblePin, setModalVisiblePin] = useState(false);
  const [modalVisibleScanNFC, setModalVisibleScanNFC] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();

  const accounts = useSelector((root: RootState) => root.accounts.accounts);

  const isPrivateKeyValid = (_privateKey: string) => {
    try {
      const wallet = new Wallet(_privateKey);
      const address = wallet.address;
      return !!address;
    } catch (error) {
      return false;
    }
  };

  const _setPrivateKey = (_privateKey: string) => {
    const isPrivateKey = isPrivateKeyValid(_privateKey);
    if (isPrivateKey) {
      setPrivateKey(_privateKey);
      setCheckPrivateKey('Private key is valid.');
      setIsDisabled(false);
    } else {
      setCheckPrivateKey('Invalid private key.');
    }
  };

  const _importAccount = async () => {
    const verify = await VerifyPin(pin);
    const index = accounts.length;
    if (verify.isVerify) {
      const account_import = await ImportAccount(privateKey, index);
      if (account_import) {
        const response = await axiosInstance.post('card/importAccount', {
          account: {
            address: account_import.address,
            publicKey: account_import.publickey,
            name: `Account ${index + 1}`,
            type: 'Import',
            email: '',
            tel: '',
          },
        });
        dispatch(setAccounts(response.data.data.listAddress));
        dispatch(setAccountSelect(index));
        setModalVisible(false);
      }
    } else {
      // showNotification('Pin', 'Wrong pin code', 'warning');
      setModalVisiblePin(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalVisibleAccounts(true);
    setCheckPrivateKey('');
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
              <Text style={styles.label}>Import Account</Text>
              <Text style={styles.warningTextStyle}>
                Only 5 accounts can be imported to this wallet
              </Text>
            </View>
            <ScrollView style={styles.modalContent}>
              <View style={styles.selectView}>
                <Text style={styles.importTextStyle}>Import Method</Text>
                <SelectDropdown
                  data={dataSelect}
                  defaultValue="Private Key"
                  buttonStyle={styles.buttonSelect}
                  dropdownStyle={{borderRadius: 10}}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  renderDropdownIcon={() => <Icon.ChevronDown color="black" />}
                />
              </View>
              <View style={styles.viewContentInput}>
                <Text style={styles.textStyle}>Enter your private key</Text>
                <View style={styles.flex}>
                  <TextInput
                    secureTextEntry={!hide}
                    style={styles.textInputStyle}
                    onChangeText={text => _setPrivateKey(text)}
                  />
                  {hide ? (
                    <TouchableOpacity onPress={() => setHide(!hide)}>
                      <Icon.Eye color="white" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setHide(!hide)}>
                      <Icon.EyeOff color="white" />
                    </TouchableOpacity>
                  )}
                </View>
                <Text
                  style={[
                    styles.textCheckPrivateKeyStyle,
                    {
                      color:
                        checkPrivateKey === 'Private key is valid.'
                          ? 'green'
                          : 'red',
                    },
                  ]}>
                  {checkPrivateKey}
                </Text>
              </View>
              <Button
                name="Comfirm"
                mt={50}
                isDisabled={isDisabled}
                func={() => setModalVisiblePin(true)}
              />
            </ScrollView>
          </View>
          {modalVisiblePin && (
            <ModalEnterPIN
              modalVisible={modalVisiblePin}
              setModalVisible={setModalVisiblePin}
              setPin={setPin}
              setModalVisibleScanNFC={setModalVisibleScanNFC}
            />
          )}
          {modalVisibleScanNFC && (
            <ModalScanNFC
              modalVisible={modalVisibleScanNFC}
              setModalVisible={setModalVisibleScanNFC}
              func={_importAccount}
            />
          )}
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
    top: '20%',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  },
  viewContent: {
    // height: HEIGHT(60),
    // flex: 1,
    // alignItems: 'center',
  },
  lineBack: {
    // height: 8,
    paddingHorizontal: '12%',
    paddingVertical: 4,
    marginVertical: 4,
    width: '20%',
    backgroundColor: 'black',
    borderRadius: 5,
  },
  label: {
    color: 'white',
    fontWeight: '500',
    fontSize: getFont(20),
    textAlign: 'center',
    paddingTop: 4,
  },
  warningTextStyle: {
    fontWeight: '400',
    fontSize: getFont(12),
    color: R.colors.color_tone_11,
  },
  selectView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  importTextStyle: {
    color: 'white',
    fontSize: getFont(20),
  },
  buttonSelect: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    width: WIDTH(180),
    height: HEIGHT(40),
  },
  viewContentInput: {
    marginTop: '30%',
    marginHorizontal: 8,
  },
  textStyle: {
    marginVertical: 10,
    color: 'white',
    fontSize: getFont(24),
    fontWeight: '600',
  },
  textInputStyle: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    color: 'white',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    fontSize: 20,
    width: WIDTH(320),
  },
  textCheckPrivateKeyStyle: {
    marginLeft: 10,
    fontWeight: '600',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default ModalImportAccount;
