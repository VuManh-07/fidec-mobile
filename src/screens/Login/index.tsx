import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../store/StoreComponents/account';
import R from '../../assets/R';
import {HEIGHT, WIDTH, getFont, getLineHeight} from '../../utils/functions';
import Button from '../../components/Button';
import ModalNFC from '../../components/Modal/ModalNFC';
import {VerifyPin, GetIdCard} from '../../nfc/wallet';
import {navigate} from '../../navigate/navigation-service';
import axiosInstance from '../../utils/axios/axios';
// import {setLoading} from '../../store/StoreComponents/LoadingSlice';

const lengthPin = 8;

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const password = useRef<string>('');

  const openModalNFC = () => {
    setModalVisible(true);
  };

  const Login = async () => {
    const pincode = password.current;
    console.log(pincode);
    const {isVerify, message, times} = await VerifyPin(pincode);
    console.log(isVerify, message, times);
    if (isVerify) {
      const id = await GetIdCard();
      await axiosInstance.get(`card/save/id_card/${id}`);
      dispatch(setIsLogin(true));
      navigate('Home');
    } else {
      setErrorMessage(message);
    }
    return;
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Image style={styles.logoIcon} source={R.images.loggo3x} />
        <Image style={styles.logoName} source={R.images.logoName} />
        <Text style={styles.text}>
          The Secure Decentralized Web {'\n'}& Crypto Access Connection
        </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.inputLogin}
          onChangeText={(text: string) => (password.current = text)}
          maxLength={lengthPin}
          keyboardType="numeric"
        />
        <Text style={styles.textError}>{errorMessage}</Text>
        <Button
          name="Enter Your Wallet"
          colorButton="#EEC140"
          colorText="white"
          width={WIDTH(353)}
          height={HEIGHT(55)}
          mt={20}
          func={openModalNFC}
        />
        <Text style={styles.textDesc}>
          You only have{' '}
          <Text style={styles.textUnderline}>atmost three trials</Text> before
          your wallet is blocked
        </Text>
        <ModalNFC
          func={Login}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.background,
    alignItems: 'center',
  },
  logoIcon: {
    marginTop: 40,
    width: WIDTH(100),
    height: HEIGHT(100),
  },
  logoName: {
    marginTop: 10,
    width: WIDTH(210),
    height: HEIGHT(90),
  },
  text: {
    fontSize: getFont(25),
    fontWeight: 'bold',
    color: '#C36027',
  },
  textError: {
    color: 'red',
    fontSize: getFont(16),
    fontWeight: '300',
  },
  inputLogin: {
    marginTop: 20,
    width: WIDTH(353),
    borderBottomWidth: 1,
    borderColor: '#EEC140',
    color: '#F6F6F6',
    fontSize: getFont(20),
    lineHeight: getLineHeight(24),
    textAlign: 'center',
  },
  textDesc: {
    fontSize: getFont(12),
    fontWeight: '400',
    color: '#EEC140',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
