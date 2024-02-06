import {View, ScrollView, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Header from '../../components/Header/Header';

import News from './News';
import Balance from './Balance';
import ListToken from './ListToken';
import ToolsTab from './ToolsTab';
import ChatBot from './ChatBot';
import ModalMenu from '../../components/Modal/ModalMenu';
import ModalAccounts from '../../components/Modal/ModalAccounts';
import ModalAccountDetails from '../../components/Modal/ModalAccountDetails';
import ModalNetwork from '../../components/Modal/ModalNetwork';
import ModalSetting from '../../components/Modal/ModalSetting';
import ModalSend from '../../components/Modal/ModalSend';
import ModalAccountsSelectSend from '../../components/Modal/ModalAccountsSelectSend';
import {IAccount} from '../../store/StoreComponents/account';
import ModalQRCodeAccount from '../../components/Modal/ModalQRCodeAccount';
import ModalImportNetwork from '../../components/Modal/ModalImportNetwork';
import ModalImportAccount from '../../components/Modal/ModalImportAccount';
import ModalTokenImport from '../../components/Modal/ModalTokenImport';
import ModalDeleteToken from '../../components/Modal/ModalDeleteToken';
import ModalQRCodeScanner from '../../components/Modal/ModalQRCodeScanner';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisibleMenu, setModalVisibleMenu] = useState(false);
  const [modalVisibleAccount, setModalVisibleAccounts] = useState(false);
  const [modalVisibleAccountDetails, setModalVisibleAccountDetails] =
    useState(false);
  const [modalVisibleQRCodeAccount, setModalVisibleQRCodeAccount] =
    useState(false);
  const [modalVisibleImportAccount, setModalVisibleImportAccount] =
    useState(false);
  const [modalVisibleNetwork, setModalVisibleNetwork] = useState(false);
  const [modalVisibleImportNetwork, setModalVisibleImportNetwork] =
    useState(false);
  const [modalVisibleSetting, setModalVisibleSetting] = useState(false);
  const [modalVisibleSend, setModalVisibleSend] = useState(false);
  const [modalVisibleAccountsSelectSend, setModalVisibleAccountsSelectSend] =
    useState(false);
  const [modalVisibleTokenImport, setModalVisibleTokenImport] = useState(false);
  const [modalVisibleDeleteToken, setModalVisibleDeleteToken] = useState(false);
  const [modalVisibleQRCodeScanner, setModalVisibleQRCodeScanner] =
    useState(false);
  const [typeSelectAccount, setTypeSelectAccount] = useState<string>('');
  const [accountDetails, setAccountDetails] = useState<IAccount>({
    address: '',
    publicKey: '',
    name: '',
    type: '',
    tel: '',
    email: '',
  });
  const [addressTokenImport, setAddressTokenImport] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View style={styles.main}>
      <Header setModalVisible={setModalVisibleMenu} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Balance refreshing={refreshing} />
        <ToolsTab
          setModalVisibleSend={setModalVisibleSend}
          setModalVisibleTokenImport={setModalVisibleTokenImport}
        />
        <ListToken setModalVisibleDeleteToken={setModalVisibleDeleteToken} />
        <News />
      </ScrollView>
      <ChatBot />
      {/* All modal for Menu */}
      <ModalMenu
        modalVisible={modalVisibleMenu}
        setModalVisible={setModalVisibleMenu}
        setModalVisibleAccount={setModalVisibleAccounts}
        setModalVisibleNetwork={setModalVisibleNetwork}
        setModalVisibleSetting={setModalVisibleSetting}
      />
      {/* account */}
      <ModalAccounts
        modalVisible={modalVisibleAccount}
        setModalVisible={setModalVisibleAccounts}
        setModalVisibleMenu={setModalVisibleMenu}
        setModalVisibleAccountDetails={setModalVisibleAccountDetails}
        setAccountDetails={setAccountDetails}
        setModalVisibleImportAccount={setModalVisibleImportAccount}
      />
      <ModalAccountDetails
        modalVisible={modalVisibleAccountDetails}
        setModalVisible={setModalVisibleAccountDetails}
        setModalVisibleAccounts={setModalVisibleAccounts}
        setModalVisibleQRCodeAccount={setModalVisibleQRCodeAccount}
        accountDetails={accountDetails}
      />
      <ModalQRCodeAccount
        modalVisible={modalVisibleQRCodeAccount}
        setModalVisible={setModalVisibleQRCodeAccount}
        setModalVisibleAccountDetails={setModalVisibleAccountDetails}
        accountDetails={accountDetails}
      />
      <ModalImportAccount
        modalVisible={modalVisibleImportAccount}
        setModalVisible={setModalVisibleImportAccount}
        setModalVisibleAccounts={setModalVisibleAccounts}
      />
      {/* network */}
      <ModalNetwork
        modalVisible={modalVisibleNetwork}
        setModalVisible={setModalVisibleNetwork}
        setModalVisibleMenu={setModalVisibleMenu}
        setModalVisibleImportNetwork={setModalVisibleImportNetwork}
      />
      <ModalImportNetwork
        modalVisible={modalVisibleImportNetwork}
        setModalVisible={setModalVisibleImportNetwork}
        setModalVisibleNetwork={setModalVisibleNetwork}
      />
      <ModalSetting
        modalVisible={modalVisibleSetting}
        setModalVisible={setModalVisibleSetting}
        setModalVisibleMenu={setModalVisibleMenu}
      />

      {/* All modal for Tabtools */}
      {/* Send */}
      <ModalSend
        modalVisible={modalVisibleSend}
        setModalVisible={setModalVisibleSend}
        setModalVisibleAccountsSelectSend={setModalVisibleAccountsSelectSend}
        setTypeSelectAccount={setTypeSelectAccount}
      />
      <ModalAccountsSelectSend
        modalVisible={modalVisibleAccountsSelectSend}
        typeSelectAccount={typeSelectAccount}
        setModalVisible={setModalVisibleAccountsSelectSend}
        setModalVisibleSend={setModalVisibleSend}
      />
      {/* Import Token */}
      <ModalTokenImport
        modalVisible={modalVisibleTokenImport}
        setModalVisible={setModalVisibleTokenImport}
        setModalVisibleQRCodeScanner={setModalVisibleQRCodeScanner}
        setAddressTokenImport={setAddressTokenImport}
        addressTokenImport={addressTokenImport}
      />
      <ModalDeleteToken
        modalVisible={modalVisibleDeleteToken}
        setModalVisible={setModalVisibleDeleteToken}
      />

      {/* QR code scanner */}
      {modalVisibleQRCodeScanner && (
        <ModalQRCodeScanner
          modalVisible={modalVisibleQRCodeScanner}
          setModalVisible={setModalVisibleQRCodeScanner}
          setValue={setAddressTokenImport}
        />
      )}
    </View>
  );
};

export default HomeScreen;
