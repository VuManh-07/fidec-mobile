import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HEIGHT, WIDTH, getFont} from '../../utils/functions';
import {navigate} from '../../navigate/navigation-service';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import * as Icon from 'react-native-feather';
import axiosInstance from '../../utils/axios/axios';
import {setLoading} from '../../store/StoreComponents/LoadingSlice';
import {
  setAccountSelect,
  setAccounts,
  setStateBalance,
} from '../../store/StoreComponents/account';
import {
  setListNetImport,
  setListNetNoImport,
  setNetworkSelect,
} from '../../store/StoreComponents/network';
import Provider from '../../utils/web3';
import R from '../../assets/R';
import {
  setCurrentToken,
  setListTokens,
} from '../../store/StoreComponents/token';

interface Props {
  refreshing: boolean;
}

const Balance = ({refreshing}: Props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((root: RootState) => root.accounts.isLogin);
  const account = useSelector((root: RootState) => root.accounts.account);
  const network = useSelector((root: RootState) => root.networks.network);
  const currentToken = useSelector(
    (root: RootState) => root.tokens.currentToken,
  );

  const [checkHideBalance, setCheckHideBalance] = useState(false);
  const [_balance, setBalance] = useState('');

  const login = () => {
    navigate('Login');
  };

  const getInfoCard = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get('card/getInfoCard');
      dispatch(setAccounts(response.data.data.listAddress));
      dispatch(setAccountSelect(0));
      dispatch(setListNetImport(response.data.data.listNetImport));
      dispatch(setListNetNoImport(response.data.data.listNetNoImport));
      dispatch(setNetworkSelect(0));
      dispatch(setListTokens(response.data.data.listToken));
      dispatch(
        setCurrentToken({
          address_account: account.address,
          address_contract: '',
          symbol: network.symbol,
          type: 'nativecoin',
          logo: network.logo,
        }),
      );
      return;
    } catch (error) {
      throw error;
    } finally {
    }
  };

  const getBalance = async (type: string) => {
    dispatch(setLoading(true));
    setBalance('0');
    try {
      const provider = new Provider(
        network,
        account,
        currentToken.type,
        currentToken.address_contract,
      );
      const {balance}: any = await provider.getBalance(type);
      console.log(balance);
      setBalance(balance);
      dispatch(setStateBalance(balance));
    } catch (error) {
      console.log('Có lỗi khi lấy số dư:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (isLogin) {
      getInfoCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  useEffect(() => {
    if (network.rpc_provider && currentToken.type) {
      getBalance(currentToken.type ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network.rpc_provider, account, currentToken, refreshing]);

  if (!isLogin) {
    return (
      <TouchableOpacity onPress={login}>
        <View style={styles.containerNonLogin}>
          <Text style={styles.text}>Login with your card</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.containerLogin}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
          }}
        />
        <View style={styles.content}>
          <Text style={styles.text}>Balance</Text>
          {/* <Text style={styles.text}>{account.name}</Text> */}
          <View style={styles.contentBalance}>
            <Text style={styles.textBalance}>
              {!checkHideBalance ? _balance : '*****'} {currentToken.symbol}
            </Text>
            <TouchableOpacity
              onPress={() => setCheckHideBalance(!checkHideBalance)}>
              {!checkHideBalance ? (
                <Icon.Eye height={HEIGHT(28)} width={WIDTH(28)} color="white" />
              ) : (
                <Icon.EyeOff
                  height={HEIGHT(28)}
                  width={WIDTH(28)}
                  color="white"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containerNonLogin: {
    backgroundColor: R.colors.color_tone_3,
    marginVertical: '12%',
    marginLeft: 10,
    width: WIDTH(200),
    height: HEIGHT(55),
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: getFont(20),
  },
  containerLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: HEIGHT(200),
    // width: WIDTH(300),
  },
  img: {
    width: 100,
    height: 100,
    marginHorizontal: '12%',
  },
  content: {
    backgroundColor: R.colors.color_tone_3,
    paddingVertical: 10,
    alignItems: 'center',
    width: '50%',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  contentBalance: {
    flexDirection: 'row',
  },
  textBalance: {
    fontWeight: '300',
    paddingHorizontal: 10,
    fontSize: getFont(20),
    color: 'white',
  },
});

export default Balance;
