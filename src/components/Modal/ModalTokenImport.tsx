import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {HEIGHT, WIDTH, getFont} from '../../utils/functions';
import R from '../../assets/R';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {TextInput} from 'react-native-gesture-handler';
import Svg, {Path} from 'react-native-svg';
import Button from '../Button';
import Provider from '../../utils/web3';
import axiosInstance from '../../utils/axios/axios';
import {setListTokens} from '../../store/StoreComponents/token';
import {setLoading} from '../../store/StoreComponents/LoadingSlice';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
  addressTokenImport: string;
  setModalVisibleQRCodeScanner: SetStateFunction<boolean>;
  setAddressTokenImport: SetStateFunction<string>;
}

const ModalQRCodeAccount = ({
  modalVisible,
  setModalVisible,
  addressTokenImport,
  setModalVisibleQRCodeScanner,
  setAddressTokenImport,
}: Props) => {
  const [dataCheckAddress, setDataCheckAddress] = useState<{
    data?: {name: string; address: string; symbol: string; type: string};
    msg: string;
    isCheck: boolean;
  }>({msg: '', isCheck: false});

  const dispatch = useDispatch();

  const network = useSelector((root: RootState) => root.networks.network);
  const account = useSelector((root: RootState) => root.accounts.account);

  const provider = new Provider(network, account);

  const _checkAddressContract = async (address: string) => {
    dispatch(setLoading(true));
    setAddressTokenImport(address);
    try {
      const data: any = await provider.checkTypeToken(address);
      if (!data.error) {
        setDataCheckAddress({
          data: {...data, address},
          msg: data?.type,
          isCheck: true,
        });
      } else {
        setDataCheckAddress({
          msg: 'Unable to determine token type.',
          isCheck: false,
        });
      }
    } catch (error) {
      setDataCheckAddress({msg: 'Invalid token address.', isCheck: false});
    } finally {
      dispatch(setLoading(false));
    }
  };

  const _importToken = async () => {
    dispatch(setLoading(true));
    if (dataCheckAddress.data?.type === 'ERC-20') {
      const response = await axiosInstance.post('card/importToken', {
        token: {
          ...dataCheckAddress.data,
          chainId: network.chainId,
          logo: '',
        },
      });
      console.log(response.data.data.listToken);
      if (response.data.isImport) {
        dispatch(setListTokens(response.data.data.listToken));
      } else {
        console.log(response.data.data.message);
      }
    } else if (dataCheckAddress.data?.type === 'ERC-721') {
    } else {
    }
    setModalVisible(false);
    dispatch(setLoading(false));
  };

  const closeModal = () => {
    setAddressTokenImport('');
    setModalVisible(false);
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
              <Text style={styles.label}>Import Token</Text>
            </View>
            <View style={styles.modalContent}>
              <View style={{alignItems: 'center'}}>
                <Text style={[styles.text, {color: R.colors.color_tone_7}]}>
                  {network.name}
                </Text>
                <Text
                  style={[
                    styles.text,
                    {color: R.colors.color_tone_11, marginTop: 12},
                  ]}>
                  Anyone can create a token
                </Text>
                <Text style={[styles.text, {color: R.colors.color_tone_11}]}>
                  Please make sure you trust it
                </Text>
              </View>
              <View style={styles.viewInput}>
                <Text style={styles.textEnter}>Enter your token address</Text>
                <View style={{position: 'relative'}}>
                  <TextInput
                    style={styles.textInput}
                    value={addressTokenImport}
                    onChangeText={text => _checkAddressContract(text)}
                  />
                  <TouchableOpacity
                    style={styles.styleQRCode}
                    onPress={() => setModalVisibleQRCodeScanner(true)}>
                    <Svg
                      width={WIDTH(40)}
                      height={HEIGHT(40)}
                      viewBox="0 0 60 60"
                      fill="none">
                      <Path
                        d="M22.4999 0H0V22.5H22.4999V0ZM18.7499 18.75H3.74998V3.75H18.7499V18.75Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M19.7139 7.71484H27.2138V15.2148H19.7139V7.71484Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M0 60H22.4999V37.5H0V60ZM3.74998 41.25H18.7499V56.25H3.74998V41.25Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M7.49951 45H14.9995V52.5H7.49951V45Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M37.5 0V22.5H59.9999V0H37.5ZM56.2499 18.75H41.25V3.75H56.2499V18.75Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M45 7.5H52.5V15H45V7.5Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M7.49996 26.1406H0V33.6406H11.2499V29.8906H7.49996V26.1406Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M26.2495 33.75H33.7495V41.25H26.2495V33.75Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M8.14307 28.2852H15.643V32.0352H8.14307V28.2852Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M33.7495 45H26.2495V48.75H29.9995V52.5H33.7495V48.75V45Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M22.5005 26.25V30H18.7505V33.75H26.2504V26.25H22.5005Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M29.9995 15H33.7495V22.5H29.9995V15Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M33.7495 30V33.75H41.2494V26.25H29.9995V30H33.7495Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M26.2495 22.5H29.9995V26.25H26.2495V22.5Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M33.749 52.5H41.249V60H33.749V52.5Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M26.2495 52.5H29.9995V60H26.2495V52.5Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M33.749 41.25H37.499V45H33.749V41.25Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M33.7495 11.25V3.75H29.9995V0H26.2495V15H29.9995V11.25H33.7495Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M45 52.5H48.75V60H45V52.5Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M45 45H52.5V48.75H45V45Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M41.25 48.75H45V52.5H41.25V48.75Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M37.5 45H41.25V48.75H37.5V45Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M52.5 37.5V41.25H56.25V45H60V37.5H56.25H52.5Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M56.25 48.75H52.5V60H60V52.5H56.25V48.75Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M37.5 37.5V41.25H48.7499V33.75H41.25V37.5H37.5Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                      <Path
                        d="M45 26.25V30H52.5V33.75H59.9999V26.25H52.5H45Z"
                        fill="white"
                        fill-opacity="0.9"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{color: dataCheckAddress.isCheck ? 'green' : 'red'}}>
                  {dataCheckAddress.msg}
                </Text>
              </View>
              <Button name="Comfirm" mt="50%" func={_importToken} />
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
    top: '10%',
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
  viewInput: {
    marginTop: '15%',
    marginHorizontal: 8,
  },
  textEnter: {
    fontSize: getFont(20),
    fontWeight: '600',
    color: 'white',
  },
  textInput: {
    marginVertical: 8,
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    fontSize: getFont(18),
    backgroundColor: R.colors.color_tone_3,
    padding: 10,
  },
  styleQRCode: {
    position: 'absolute',
    right: 4,
    top: 16,
    zIndex: 99999,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: getFont(18),
    fontWeight: '400',
  },
});

export default ModalQRCodeAccount;
