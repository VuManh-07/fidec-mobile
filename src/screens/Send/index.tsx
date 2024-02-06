import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {HEIGHT, WIDTH, getFont} from '../../utils/functions';
import HeaderNewScreen from '../../components/Header/HeaderNewScreen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import Button from '../../components/Button';
import Provider from '../../utils/web3';
import {setLoading} from '../../store/StoreComponents/LoadingSlice';
import ModalSignScanNFC from '../../components/Modal/ModalSignScanNFC';
import ModalEnterPIN from '../../components/Modal/ModalEnterPIN';
import R from '../../assets/R';
import SelectDropdown from 'react-native-select-dropdown';
import * as Icon from 'react-native-feather';
import {ethers} from 'ethers';
import Svg, {Path} from 'react-native-svg';
import ModalQRCodeScanner from '../../components/Modal/ModalQRCodeScanner';

const countries = ['ETH', 'Fidec', 'Link', 'Dao'];

const Send = () => {
  const [modalVisibleEnterPIN, setModalVisibleEnterPIN] = useState(false);
  const [modalVisibleNFC, setModalVisibleNFC] = useState(false);
  const [modalVisibleQRCodeScanner, setModalVisibleQRCodeScanner] =
    useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [msgCheckAmount, setMsgCheckAmount] = useState<string>('');
  const [amount, setAmount] = useState('0');
  const [typeSend, setTypeSend] = useState<string>('legacy');
  const [estimateGas, setEstimateGas] = useState<string>('0');
  const [total, setTotal] = useState<string>('0');
  const [pin, setPin] = useState<string>('0');
  const [addressTo, setAddressTo] = useState<string>('');
  const [provider, setProvider] = useState<any>();

  const dispatch = useDispatch();
  const route = useRoute();
  const accountTo: any = route.params;

  const account = useSelector((root: RootState) => root.accounts.account);
  const balance = useSelector((root: RootState) => root.accounts.balance);
  const network = useSelector((root: RootState) => root.networks.network);
  const currentToken = useSelector(
    (root: RootState) => root.tokens.currentToken,
  );

  const _tx = async () => {
    dispatch(setLoading(true));
    try {
      const _Tx = await provider.createTx(
        accountTo.address,
        amount,
        typeSend,
        currentToken.type,
      );
      console.log(_Tx);
      dispatch(setLoading(false));
      setModalVisibleEnterPIN(true);
    } catch (error) {
      console.log('send tx', error);
    }
  };

  const getGas = async () => {
    try {
      dispatch(setLoading(true));
      const gas = await provider.getGas(account.address, '0x');
      const estimated = Number(gas.gasLimit) * Number(gas.maxFeePerGas);
      setEstimateGas(ethers.utils.formatUnits(estimated, 18).slice(0, 9));
      setTotal(ethers.utils.formatUnits(estimated, 18).slice(0, 9));
    } catch (error) {
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const checkAmount = (amt: string) => {
    const _amount = !amt ? '0' : amt;
    const max = Number(balance) - Number(estimateGas);
    const _total = !amt ? estimateGas : Number(_amount) + Number(estimateGas);
    setAmount(_amount);
    setTotal(_total.toString());
    if (Number(amt) > max) {
      setIsDisabled(true);
      setMsgCheckAmount('Insufficient funds for gas');
      return;
    } else {
      setIsDisabled(false);
      setMsgCheckAmount('');
    }
  };

  const setMaxAmount = () => {
    const max = Number(balance) - Number(estimateGas);
    setAmount(max.toString().slice(0, 8));
    setTotal(balance);
    setIsDisabled(false);
  };

  const openQRCodeScanner = () => {
    setModalVisibleQRCodeScanner(true);
  };

  useEffect(() => {
    const _provider = new Provider(
      network,
      account,
      currentToken.type,
      currentToken.address_contract,
    );
    setProvider(_provider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (provider) {
      getGas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  useEffect(() => {
    if (accountTo.chatbot) {
      setAmount(accountTo.amount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <HeaderNewScreen name="Send ETH" />
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.viewcard}>
          <View style={styles.addressView}>
            <Text style={styles.textLabelAdd}>From {account.name}</Text>
            <Text style={styles.textAdd}>{account.address}</Text>
          </View>
          {accountTo.typeSelectAccount === 'Internal accounts' ? (
            <View style={styles.addressView}>
              <Text style={styles.textLabelAdd}>
                To {accountTo.name ?? 'Address'}
              </Text>
              <Text style={styles.textAdd}>{accountTo.address}</Text>
            </View>
          ) : (
            <View>
              <View style={[styles.flex]}>
                <Text style={styles.textLabel}>Send To Address</Text>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                  <Svg
                    width={WIDTH(40)}
                    height={HEIGHT(40)}
                    viewBox="0 0 60 60"
                    fill="none">
                    <Path
                      d="M26.9174 48.5128C25.7997 48.5128 24.8951 49.4174 24.8951 50.535C24.8951 51.6555 25.7997 52.56 26.9174 52.56C28.038 52.56 28.9434 51.6555 28.9434 50.535C28.9434 49.4174 28.038 48.5128 26.9174 48.5128ZM10.6646 33.0644C10.0057 33.076 9.47924 33.6185 9.48724 34.2758V50.3874C9.48724 53.5758 12.0928 56.1847 15.2823 56.1847H37.621C38.2835 56.1847 38.8209 55.6466 38.8209 54.9886C38.8209 54.3255 38.2835 53.7874 37.621 53.7874H15.2823C13.377 53.7874 11.8768 52.2917 11.8768 50.3874V47.2513H35.246C35.931 47.2884 36.507 46.743 36.507 46.0581C36.507 45.368 35.931 44.8227 35.246 44.8649H11.8768V34.2758C11.8848 33.6025 11.3394 33.0571 10.6646 33.0644ZM14.0926 23.2257C12.8389 23.1799 12.3691 24.8501 13.4643 25.4638L22.5499 30.7093C23.1222 31.0801 23.8908 30.8983 24.2355 30.3035C24.5766 29.7124 24.3526 28.9547 23.7468 28.6406L14.6569 23.3959C14.4867 23.2941 14.294 23.2374 14.0926 23.2257ZM8.72587 10.9643C8.50552 10.9555 8.28955 11.0123 8.09684 11.1228C6.07887 12.2891 4.83245 14.4508 4.83245 16.7842C4.81718 17.7083 5.81344 18.2995 6.61627 17.8407C6.99877 17.6291 7.23366 17.2197 7.22639 16.7842C7.22639 15.303 8.01394 13.9367 9.29453 13.1936C10.3468 12.5916 9.93738 10.9897 8.72587 10.9643ZM7.10131 6.7266C6.97187 6.7266 6.84388 6.74115 6.72244 6.78259C1.89749 8.07396 -0.985119 13.0664 0.310018 17.8901C0.510725 18.6812 1.43136 19.0448 2.12001 18.5991C2.55924 18.3111 2.76067 17.7723 2.61669 17.2699C1.65897 13.6895 3.7642 10.0466 7.33983 9.08902C8.71859 8.77854 8.51352 6.75642 7.10131 6.7266ZM26.5313 5.59375C26.5269 5.59375 26.5269 5.59375 26.5269 5.59666C24.9896 5.72536 25.1067 8.01288 26.652 7.98234H29.2357C29.9244 8.02015 30.5003 7.47554 30.5003 6.78986C30.5003 6.10055 29.9244 5.55448 29.2357 5.59593H26.652C26.6105 5.59375 26.5691 5.59375 26.5313 5.59375ZM15.2823 0C15.2401 0 15.195 0.00363555 15.1528 0.00799828C11.9793 0.0763477 9.40798 2.6889 9.40798 5.88096C9.37743 6.55937 9.92283 7.13088 10.6013 7.13088C11.2834 7.13088 11.8288 6.55937 11.7983 5.88096C11.7983 3.93082 13.3319 2.39732 15.283 2.39732H38.5569C40.4622 2.39732 41.9624 3.89374 41.9624 5.79807V18.6434L22.6989 7.52498C21.6503 6.91929 20.4381 6.70697 19.3473 6.90039C18.2529 7.09089 17.2755 7.68422 16.6887 8.69565L8.06703 23.6235C6.8926 25.6529 7.96086 28.2021 10.0625 29.4135L35.5143 44.1116C37.1018 45.0277 39.0478 45.0474 40.4113 44.1298C40.468 44.3457 40.5211 44.5319 40.5749 44.7776C40.7792 45.6793 41.0178 46.7576 41.4992 47.8308C42.4612 49.978 44.6581 52.0001 48.6199 52.0001C49.302 52.0299 49.8699 51.4875 49.8699 50.8069C49.8699 50.1249 49.302 49.5795 48.6199 49.6137C45.3657 49.6137 44.3854 48.435 43.6771 46.8528C43.3208 46.0603 43.1048 45.1405 42.9041 44.2512C42.7034 43.3605 42.5631 42.5046 42.0976 41.6975C42.0976 41.6975 42.0933 41.6946 42.0896 41.6903L38.738 36.0209C38.522 35.653 38.4086 35.2981 38.3969 35.0735C38.3817 34.8546 38.3969 34.7891 38.5562 34.6306C38.8893 34.2983 39.3896 34.2896 39.6848 34.6052L44.6159 39.8528C44.7905 40.0361 45.0137 40.1611 45.2602 40.2062C45.2602 40.2062 48.4039 41.0089 49.366 42.6828C50.1768 44.0192 52.1955 42.8558 51.4414 41.4859C49.8474 38.7294 46.7902 38.1077 46.1467 37.9907L41.4279 32.9648C40.8098 32.3104 39.9771 31.9919 39.1474 31.9948C38.314 31.9992 37.4887 32.3169 36.8669 32.9379C36.235 33.5712 35.9623 34.4459 36.0074 35.2102C36.0488 35.9744 36.3324 36.6462 36.6851 37.241L39.3939 41.8226C38.9547 42.4443 37.8443 42.6944 36.7084 42.0386L11.2565 27.3485C10.0712 26.6628 9.74539 25.5009 10.1395 24.8189L16.4305 13.9266C16.4341 13.9266 16.4341 13.9266 16.4341 13.9266L41.2839 28.2756C41.8598 28.6275 42.6096 28.4392 42.9463 27.8509C43.2837 27.2685 43.0714 26.5218 42.4765 26.2033L17.6268 11.8572L18.7597 9.89613C19.1531 9.21409 20.3167 8.91451 21.502 9.60019L46.9575 24.2902C48.1436 24.9759 48.4686 26.1393 48.0752 26.8206L45.5642 31.1674C45.3671 31.3986 45.2646 31.6931 45.2762 31.997C45.2762 32.4514 45.5373 32.863 45.9467 33.0651C46.231 33.2964 47.3066 34.1827 48.761 35.3149C50.4233 36.6099 52.3097 38.0328 53.6092 38.7461C53.6012 38.7432 54.1124 39.3482 54.4571 40.3342C54.8054 41.3223 55.1014 42.6137 55.321 43.8789C55.7682 46.4042 55.9457 48.8051 55.9457 48.8051L55.9573 48.9869L57.5593 53.0697C57.7149 53.666 57.5026 54.3109 56.7601 55.0809C56.0176 55.848 54.7909 56.5948 53.4499 57.0609C52.1046 57.527 50.6502 57.7124 49.4801 57.5422C48.337 57.3757 47.5254 56.9329 47.0259 56.1062C46.5641 55.0199 45.7802 54.2629 44.9846 53.7176C44.1622 53.1497 43.3179 52.7549 42.5718 52.3084C42.0082 51.9449 41.2505 52.1223 40.9014 52.6974C40.5531 53.2769 40.7538 54.0295 41.3443 54.3604C42.2155 54.8817 43.0263 55.2736 43.6248 55.6852C44.2269 56.0982 44.6021 56.4777 44.8443 57.0914L44.8748 57.1707L44.9235 57.2528C45.8405 58.8365 47.4651 59.6618 49.1391 59.9083C50.8095 60.1541 52.5896 59.8887 54.2338 59.3171C55.8773 58.7493 57.3848 57.8745 58.4836 56.7366C59.5816 55.5979 60.3052 54.0455 59.8732 52.4437L59.858 52.3782L58.301 48.4161C58.2894 48.2242 58.1265 46.0203 57.672 43.4572C57.4379 42.1193 57.1346 40.7377 56.7172 39.5445C56.3013 38.3477 55.8809 37.2679 54.7596 36.6513C53.8244 36.1401 51.8624 34.6932 50.2335 33.4243C49.3245 32.7198 48.5821 32.1177 48.033 31.6749L50.1463 28.0087C51.32 25.9793 50.2561 23.43 48.1545 22.2187L44.352 20.022V5.79807C44.352 2.60891 41.7464 0 38.5569 0H15.2823Z"
                      fill="white"
                    />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={openQRCodeScanner}>
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
              <View style={{position: 'relative'}}>
                <TextInput value={addressTo} style={styles.inputAddressStyle} />
                <TouchableOpacity style={styles.styleButtonSave}>
                  <Text style={[styles.textLabel, {color: 'black'}]}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* </View>
        <View style={styles.viewcard}> */}
          <Text style={styles.textLabelTransaction}>
            Transaction Information
          </Text>
          <View style={styles.flexView}>
            <Text style={styles.textLabel}>Your currency</Text>
            <View style={styles.selectView}>
              <SelectDropdown
                data={countries}
                defaultValue="ETH"
                buttonStyle={styles.buttonSelect}
                dropdownStyle={{borderRadius: 10}}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                renderDropdownIcon={() => <Icon.ChevronDown color="black" />}
              />
            </View>
          </View>
          <View style={styles.flexView}>
            <Text style={styles.textLabel}>Type send</Text>
            <View style={styles.selectView}>
              <SelectDropdown
                data={network.type_sign}
                defaultValue="legacy"
                buttonStyle={styles.buttonSelect}
                dropdownStyle={{borderRadius: 10}}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  setTypeSend(selectedItem);
                }}
                renderDropdownIcon={() => <Icon.ChevronDown color="black" />}
              />
            </View>
          </View>
          <View style={styles.flexView}>
            <Text style={styles.textLabel}>Balance</Text>
            <Text style={styles.textLabel}>
              {balance} {currentToken.symbol}
            </Text>
          </View>
          <View style={styles.flexView}>
            <View style={styles.flexViewAmount}>
              <Text style={styles.textLabel}>Amount</Text>
              <TouchableOpacity style={styles.maxButton} onPress={setMaxAmount}>
                <Text style={styles.maxButtonText}>Max</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={text => checkAmount(text)}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.msgCheckAmountStyle}>{msgCheckAmount}</Text>
          <View style={styles.transactionView}>
            {typeSend === 'EIP-1559' && (
              <View>
                <Text style={styles.headerText}>Transactions Speed</Text>

                <View style={styles.speedContainer}>
                  <View style={styles.speedOption}>
                    <Text style={styles.speedText}>Slow</Text>
                    {/* <Text style={styles.speedInfo}>Likely {'<'} 60 seconds</Text> */}
                  </View>
                  <View style={styles.speedOption}>
                    <Text style={styles.speedText}>Moderate</Text>
                    {/* <Text style={styles.speedInfo}>Likely {'<'} 30 seconds</Text> */}
                  </View>
                  <View style={styles.speedOption}>
                    <Text style={styles.fastText}>Fast</Text>
                    <Text style={styles.fastInfo}>Likely {'<'} 15 seconds</Text>
                  </View>
                </View>
              </View>
            )}
            <View style={styles.gasEstimationContainer}>
              <Text style={styles.gasEstimationLabel}>Gas Estimation:</Text>
              <Text style={styles.gasEstimationValue}>{estimateGas} ETH</Text>
            </View>
            <View style={styles.gasEstimationContainer}>
              <Text style={styles.gasEstimationLabel}>Total:</Text>
              <Text style={styles.gasEstimationValue}>{total} ETH</Text>
            </View>
          </View>
        </View>
        <Button
          mt={30}
          colorButton="gray"
          name="Comfirm"
          func={_tx}
          isDisabled={isDisabled}
        />
        {modalVisibleEnterPIN && (
          <ModalEnterPIN
            modalVisible={modalVisibleEnterPIN}
            setModalVisible={setModalVisibleEnterPIN}
            setModalVisibleScanNFC={setModalVisibleNFC}
            setPin={setPin}
          />
        )}
        {modalVisibleNFC && (
          <ModalSignScanNFC
            modalVisible={modalVisibleNFC}
            setModalVisible={setModalVisibleNFC}
            pin={pin}
            typeSend={typeSend}
            provider={provider}
          />
        )}
        {modalVisibleQRCodeScanner && (
          <ModalQRCodeScanner
            modalVisible={modalVisibleQRCodeScanner}
            setModalVisible={setModalVisibleQRCodeScanner}
            setValue={setAddressTo}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.color_tone_1,
  },
  viewcard: {
    marginTop: '5%',
    // backgroundColor: R.colors.color_tone_1,
    borderRadius: 10,
  },
  addressView: {
    marginHorizontal: 10,
    marginVertical: 4,
  },
  textLabelAdd: {
    color: 'white',
    fontSize: getFont(20),
  },
  textAdd: {
    color: 'white',
    fontSize: getFont(16),
    margin: 4,
    fontWeight: '300',
  },
  textLabelTransaction: {
    color: 'white',
    fontSize: getFont(28),
    margin: 8,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  flexViewAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textLabel: {
    color: 'white',
    fontSize: getFont(20),
  },
  selectView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  styleButtonSave: {
    position: 'absolute',
    right: 20,
    top: 16,
    backgroundColor: R.colors.color_tone_4,
    padding: 6,
    borderRadius: 5,
  },
  buttonSelect: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    width: WIDTH(120),
    height: HEIGHT(40),
  },
  balanceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  maxButton: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#0C95F8',
  },
  maxButtonText: {
    color: '#0C95F8',
    fontWeight: 'bold',
  },
  inputAddressStyle: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    color: 'white',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    fontSize: 20,
  },
  input: {
    color: 'black',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    width: WIDTH(160),
    height: HEIGHT(50),
    fontSize: getFont(18),
    backgroundColor: '#D9D9D9',
    textAlign: 'center',
  },
  msgCheckAmountStyle: {
    color: 'red',
    paddingLeft: '55%',
  },
  transactionView: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  speedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  speedOption: {
    alignItems: 'center',
  },
  speedText: {
    color: 'white',
  },
  speedInfo: {
    color: '#0C95F8',
  },
  fastText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fastInfo: {
    color: '#0C95F8',
  },
  gasEstimationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  gasEstimationLabel: {
    color: 'white',
    marginRight: 4,
    fontWeight: 'bold',
  },
  gasEstimationValue: {
    color: 'white',
    marginRight: 2,
  },
});

export default Send;
