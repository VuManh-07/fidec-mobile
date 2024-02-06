import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as Icon from 'react-native-feather';
import {HEIGHT, WIDTH, getFont} from '../../utils/functions';
import Button from '../Button';
import R from '../../assets/R';
import Svg, {Path} from 'react-native-svg';
import {TextInput} from 'react-native-gesture-handler';
import {IAccount} from '../../store/StoreComponents/account';
import Clipboard from '@react-native-clipboard/clipboard';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
  setModalVisibleAccounts: SetStateFunction<boolean>;
  setModalVisibleQRCodeAccount: SetStateFunction<boolean>;
  accountDetails: IAccount;
}

const ModalAccountDetails = ({
  modalVisible,
  setModalVisible,
  setModalVisibleAccounts,
  setModalVisibleQRCodeAccount,
  accountDetails,
}: Props) => {
  const [isCoppy, setIsCoppy] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const coppy = () => {
    setIsCoppy(true);
    Clipboard.setString(accountDetails.address);
    setTimeout(() => {
      setIsCoppy(false);
    }, 500);
  };

  const openQRCode = () => {
    setModalVisible(false);
    setModalVisibleQRCodeAccount(true);
  };

  const back = () => {
    setIsEdit(false);
    setModalVisible(false);
    setModalVisibleAccounts(true);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHearder}>
              <TouchableOpacity onPress={back}>
                <View style={styles.lineBack} />
              </TouchableOpacity>
              <Text style={styles.label}>Account Details</Text>
            </View>
            <ScrollView style={styles.modalContent}>
              <View style={styles.viewAccount}>
                <Text style={styles.textProvider}>
                  Provide your account details for e-commerce
                </Text>
                <View style={styles.flex}>
                  <Text style={[styles.text, {fontSize: getFont(22)}]}>
                    {accountDetails.name}
                  </Text>
                  <TouchableOpacity onPress={coppy}>
                    {!isCoppy ? (
                      <Icon.Copy color="white" style={{marginLeft: 8}} />
                    ) : (
                      <Icon.CheckCircle color="white" style={{marginLeft: 8}} />
                    )}
                  </TouchableOpacity>
                </View>
                <Text style={[styles.text, {marginBottom: 8}]}>
                  {accountDetails.address.slice(0, 6)}...
                  {accountDetails.address.slice(-4)}
                </Text>
                <TouchableOpacity onPress={openQRCode}>
                  <Svg
                    width={WIDTH(60)}
                    height={HEIGHT(56)}
                    viewBox="0 0 60 56"
                    fill="none">
                    <Path
                      d="M22.219 0H0V21H22.219V0ZM18.5158 17.5H3.70317V3.5H18.5158V17.5Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M19.4678 7.19922H26.8741V14.1992H19.4678V7.19922Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M0 56H22.219V35H0V56ZM3.70317 38.5H18.5158V52.5H3.70317V38.5Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M7.40625 42H14.8126V49H7.40625V42Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M37.0317 0V21H59.2507V0H37.0317ZM55.5476 17.5H40.7349V3.5H55.5476V17.5Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M44.438 7H51.8443V14H44.438V7Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M7.40633 24.3984H0V31.3984H11.1095V27.8984H7.40633V24.3984Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M25.9219 31.5H33.3282V38.5H25.9219V31.5Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M8.0415 26.3984H15.4478V29.8984H8.0415V26.3984Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M33.3282 42H25.9219V45.5H29.625V49H33.3282V45.5V42Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M22.2193 24.5V28H18.5161V31.5H25.9224V24.5H22.2193Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M29.625 14H33.3282V21H29.625V14Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M33.3282 28V31.5H40.7345V24.5H29.625V28H33.3282Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M25.9219 21H29.625V24.5H25.9219V21Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M33.3281 49H40.7345V56H33.3281V49Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M25.9219 49H29.625V56H25.9219V49Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M33.3281 38.5H37.0313V42H33.3281V38.5Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M33.3282 10.5V3.5H29.625V0H25.9219V14H29.625V10.5H33.3282Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M44.438 49H48.1412V56H44.438V49Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M44.438 42H51.8443V45.5H44.438V42Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M40.7349 45.5H44.438V49H40.7349V45.5Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M37.0317 42H40.7349V45.5H37.0317V42Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M51.8447 35V38.5H55.5479V42H59.2511V35H55.5479H51.8447Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M55.5479 45.5H51.8447V56H59.2511V49H55.5479V45.5Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M37.0317 35V38.5H48.1412V31.5H40.7349V35H37.0317Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                    <Path
                      d="M44.438 24.5V28H51.8443V31.5H59.2507V24.5H51.8443H44.438Z"
                      fill="white"
                      fill-opacity="0.9"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>
              {!isEdit ? (
                <View style={styles.contentEnterInf}>
                  <View style={[styles.flex, {marginVertical: 20}]}>
                    <Text style={styles.textLabelInf}>Account information</Text>
                    <TouchableOpacity onPress={() => setIsEdit(true)}>
                      <Icon.Edit color="white" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[styles.flex, {marginBottom: 20, marginLeft: 10}]}>
                    <Text style={[styles.text, {fontSize: getFont(24)}]}>
                      Name:
                    </Text>
                    <Text style={styles.textValue}>Tran Tuan Anh</Text>
                  </View>
                  <View
                    style={[styles.flex, {marginVertical: 20, marginLeft: 10}]}>
                    <Text style={[styles.text, {fontSize: getFont(24)}]}>
                      Email:
                    </Text>
                    <Text style={styles.textValue}>tuananhtran@gmail.com</Text>
                  </View>
                  <View
                    style={[styles.flex, {marginVertical: 20, marginLeft: 10}]}>
                    <Text style={[styles.text, {fontSize: getFont(24)}]}>
                      Phone:
                    </Text>
                    <Text style={styles.textValue}>+84 918498199</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.contentEnterInf}>
                  <View>
                    <Text
                      style={[
                        styles.text,
                        {fontSize: getFont(24), marginVertical: 20},
                      ]}>
                      Enter your name
                    </Text>
                    <TextInput
                      placeholder="Name"
                      style={[styles.textInput, styles.input]}
                    />
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.text,
                        {fontSize: getFont(24), marginVertical: 10},
                      ]}>
                      Enter your mail
                    </Text>
                    <TextInput
                      placeholder="Mail"
                      style={[styles.textInput, styles.input]}
                    />
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.text,
                        {fontSize: getFont(24), marginVertical: 10},
                      ]}>
                      Enter your mobile Phone
                    </Text>
                    <TextInput
                      placeholder="Phone"
                      style={[styles.textInput, styles.input]}
                    />
                  </View>
                  <View style={styles.itemButton}>
                    <Button
                      name="Save"
                      width={WIDTH(120)}
                      height={HEIGHT(60)}
                      func={() => {}}
                    />
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
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
    top: '15%',
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
  viewAccount: {
    alignItems: 'center',
  },
  textProvider: {
    fontSize: getFont(18),
    fontWeight: '400',
    color: R.colors.color_tone_9,
    marginBottom: 16,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLabelInf: {
    fontSize: getFont(28),
    fontWeight: '600',
    color: 'white',
    marginRight: 20,
  },
  text: {
    fontSize: getFont(18),
    fontWeight: '400',
    color: 'white',
  },
  textValue: {
    marginLeft: 10,
    fontSize: getFont(18),
    fontWeight: '400',
    color: 'white',
    textDecorationLine: 'underline',
  },
  itemButton: {
    marginVertical: 20,
  },
  contentEnterInf: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  textInput: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    color: 'white',
    padding: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    fontSize: 20,
  },
});

export default ModalAccountDetails;
