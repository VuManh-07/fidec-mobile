import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {getFont} from '../../utils/functions';
import Card from '../../components/Card/CardToken';
import dataToken from '../../constant/tokenData';
import {useDispatch, useSelector} from 'react-redux';
import {setIndexTokenDelete} from '../../store/StoreComponents/token';
import {RootState} from '../../store/store';
import ModalDetailsNFT from '../../components/Modal/ModalDetailsNFT';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  setModalVisibleDeleteToken: SetStateFunction<boolean>;
}

const ListToken = ({setModalVisibleDeleteToken}: Props) => {
  const [selectedItem, setSelectedItem] = useState('Token');
  const [isDetailsERC1155, setIsDetailsERC1155] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const account = useSelector((root: RootState) => root.accounts.account);
  const network = useSelector((root: RootState) => root.networks.network);

  const listTokens = useSelector((root: RootState) => root.tokens.listTokens);

  const ComfirmDelete = (name: string, address: string, index: number) => {
    dispatch(setIndexTokenDelete({name, address, index}));
    setModalVisibleDeleteToken(true);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const _openDetailsNFT = () => {
    setModalVisible(true);
  };

  const _setIsDetailsERC1155 = () => {
    setIsDetailsERC1155(!isDetailsERC1155);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleItemClick('Token')}>
          <View
            style={[
              styles.itemContainer,
              selectedItem === 'Token' ? styles.selectedItem : null,
            ]}>
            <Text
              style={[
                styles.headerText,
                selectedItem === 'Token' ? styles.selectedText : null,
              ]}>
              Token
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleItemClick('NFT')}>
          <View
            style={[
              styles.itemContainer,
              selectedItem === 'NFT' ? styles.selectedItem : null,
            ]}>
            <Text
              style={[
                styles.headerText,
                selectedItem === 'NFT' ? styles.selectedText : null,
              ]}>
              NFT
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleItemClick('ERC1155')}>
          <View
            style={[
              styles.itemContainer,
              selectedItem === 'ERC1155' ? styles.selectedItem : null,
            ]}>
            <Text
              style={[
                styles.headerText,
                selectedItem === 'ERC1155' ? styles.selectedText : null,
              ]}>
              ERC1155
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.viewTokenStyle}>
        {/* Nội dung từng mục */}
        {selectedItem === 'Token' && (
          <View>
            <Card
              address={account.address}
              name={network.name}
              symbol={network.symbol}
              logo={network.logo ?? ''}
              type="nativecoin"
            />
            {listTokens.length > 0 &&
              listTokens.map((item: any, index: number) => {
                return (
                  <Card
                    key={index}
                    address_contract={item.address}
                    name={item.name}
                    symbol={item.symbol}
                    logo={item.logo}
                    type="ERC20"
                    comfirmDelete={() =>
                      ComfirmDelete(item.name, item.address, index)
                    }
                  />
                );
              })}
          </View>
        )}
        {selectedItem === 'NFT' &&
          dataToken.map((item: any, index: number) => {
            return (
              <Card
                key={index}
                address_contract={item.address}
                name={item.name}
                symbol={item.symbol}
                logo={item.logo}
                type="ERC721"
                comfirmDelete={() =>
                  ComfirmDelete(item.name, item.address, index)
                }
                openDetails={_openDetailsNFT}
              />
            );
          })}
        {selectedItem === 'ERC1155' &&
          (!isDetailsERC1155
            ? dataToken.map((item: any, index: number) => {
                return (
                  <Card
                    key={index}
                    address_contract={item.address}
                    name={item.name}
                    symbol={item.symbol}
                    logo={item.logo}
                    type="ERC1155"
                    comfirmDelete={() =>
                      ComfirmDelete(item.name, item.address, index)
                    }
                    openDetails={_setIsDetailsERC1155}
                  />
                );
              })
            : dataToken.map((item: any, index: number) => {
                return (
                  <Card
                    key={index}
                    address_contract={item.address}
                    name={item.name}
                    symbol={item.symbol}
                    logo={item.logo}
                    type="ERC1155"
                    comfirmDelete={() =>
                      ComfirmDelete(item.name, item.address, index)
                    }
                    openDetails={_openDetailsNFT}
                  />
                );
              }))}
      </View>
      {modalVisible && (
        <ModalDetailsNFT
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    paddingBottom: 0,
    marginHorizontal: 16,
  },
  headerText: {
    fontSize: getFont(20),
    fontWeight: 'bold',
    color: 'white',
    opacity: 0.5,
  },
  selectedItem: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  selectedText: {
    color: 'white',
    opacity: 1,
  },
  viewTokenStyle: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default ListToken;
