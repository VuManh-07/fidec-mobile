import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HEIGHT, WIDTH, getFont} from '../../utils/functions';
import * as Icon from 'react-native-feather';
import R from '../../assets/R';
import Svg, {Path} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import Provider from '../../utils/web3';
import {setCurrentToken} from '../../store/StoreComponents/token';

interface Props {
  address?: string;
  address_contract?: string;
  name: string;
  symbol: string;
  logo: string;
  type: string;
  comfirmDelete?: () => void;
  openDetails?: () => void;
}

const Card = ({
  address,
  address_contract,
  name,
  symbol,
  logo,
  type,
  comfirmDelete,
  openDetails,
}: Props) => {
  console.log(logo);
  const [_balance, setBalance] = useState('0');

  const dispatch = useDispatch();

  const account = useSelector((root: RootState) => root.accounts.account);
  const network = useSelector((root: RootState) => root.networks.network);

  const getBalance = async () => {
    setBalance('0');
    try {
      const provider = new Provider(network, account, type, address_contract);
      const {balance}: any = await provider.getBalance(type);
      console.log(balance);
      setBalance(balance);
    } catch (error) {
      console.log('Có lỗi khi lấy số dư:', error);
    } finally {
    }
  };

  const _setCurrentToken = () => {
    dispatch(
      setCurrentToken({
        address_account: address,
        address_contract,
        symbol,
        type,
        logo,
      }),
    );
  };

  useEffect(() => {
    if (network.rpc_provider && type) {
      getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network.rpc_provider, account]);

  return (
    <TouchableOpacity onPress={_setCurrentToken}>
      <View style={styles.container}>
        <View style={styles.mainHeader}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://cdn.dribbble.com/users/15367/screenshots/2377320/logo.png',
            }}
          />
          <View>
            <Text style={styles.textName}>
              {name.length > 12 ? name.slice(0, 12) + '...' : name}
            </Text>
            <Text style={styles.textAddress}>
              {address_contract &&
                `${address_contract.slice(0, 6)}...${address_contract.slice(
                  -4,
                )}`}
              {address && `${address.slice(0, 6)}...${address.slice(-4)}`}
            </Text>
          </View>
        </View>
        <View style={styles.mainFooter}>
          <Text style={styles.textBalance}>{_balance}</Text>
          <Text style={styles.textSymbol}>{symbol}</Text>
          {type === 'ERC20' && (
            <TouchableOpacity style={styles.iconStyle} onPress={comfirmDelete}>
              <Icon.XCircle
                color="white"
                width={WIDTH(20)}
                height={HEIGHT(25)}
              />
            </TouchableOpacity>
          )}
          {(type === 'ERC721' || type === 'ERC1155') && (
            <TouchableOpacity style={styles.iconStyle} onPress={openDetails}>
              <Svg
                width={WIDTH(15)}
                height={HEIGHT(20)}
                viewBox="0 0 30 35"
                fill="none">
                <Path
                  d="M30 17.3205L0 34.641L0 0L30 17.3205Z"
                  fill="white"
                  fill-opacity="0.5"
                />
              </Svg>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    backgroundColor: R.colors.color_tone_3,
    height: HEIGHT(80),
    width: WIDTH(340),
    fontSize: getFont(16),
    borderRadius: 10,
    shadowColor: 'gray',
    shadowRadius: 4,
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: getFont(20),
  },
  textName: {
    color: R.colors.color_tone_4,
    fontWeight: '600',
    fontSize: getFont(20),
  },
  textAddress: {
    color: R.colors.color_tone_5,
  },
  textBalance: {
    color: R.colors.color_tone_4,
    marginRight: 10,
    fontWeight: '400',
    fontSize: getFont(20),
  },
  textSymbol: {
    marginRight: 10,
    fontWeight: '400',
    fontSize: getFont(20),
    color: R.colors.color_tone_5,
  },
  iconStyle: {
    padding: 10,
  },
  img: {
    marginHorizontal: 10,
    width: WIDTH(44),
    height: HEIGHT(55),
    borderRadius: 30,
  },
});

export default Card;
