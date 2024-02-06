import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  //   Image,
} from 'react-native';
// import R from '../../assets/R';
import {HEIGHT, WIDTH, getFont} from '../../utils/functions';
import IconMenu from '../IconMenu';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import R from '../../assets/R';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
  setModalVisibleAccount: SetStateFunction<boolean>;
  setModalVisibleNetwork: SetStateFunction<boolean>;
  setModalVisibleSetting: SetStateFunction<boolean>;
}

const data = [
  {id: 1, name: 'Account'},
  {id: 2, name: 'Network'},
  {id: 3, name: 'Transaction History'},
  {id: 4, name: 'Settings'},
  {id: 5, name: 'Referral'},
  {id: 6, name: 'Order new card'},
];

const ModalMenu = ({
  modalVisible,
  setModalVisible,
  setModalVisibleAccount,
  setModalVisibleNetwork,
  setModalVisibleSetting,
}: Props) => {
  const account = useSelector((root: RootState) => root.accounts.account);
  const network = useSelector((root: RootState) => root.networks.network);

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleModalPress = (event: any) => {
    // Check if the click event target is the modal content
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const openItem = (name: string) => {
    setModalVisible(false);
    if (name === 'Account') {
      setModalVisibleAccount(true);
    } else if (name === 'Network') {
      setModalVisibleNetwork(true);
    } else if (name === 'Settings') {
      setModalVisibleSetting(true);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={handleModalPress}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHearder}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.lineBack} />
              </TouchableOpacity>
              <Text style={styles.textStyle}>
                Your current {account.name}: {account.address.slice(0, 6)}...
                {account.address.slice(-4)}
              </Text>
              <Text style={styles.textStyle}>
                Current network: {network.name}
              </Text>
            </View>
            <View style={styles.modalContent}>
              {data.map(item => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => openItem(item.name)}>
                    <View style={styles.modalContenItem}>
                      <View style={styles.ItemIcon}>
                        <IconMenu
                          iconName={item.name}
                          width={WIDTH(48)}
                          height={HEIGHT(48)}
                        />
                      </View>
                      <Text style={styles.contentItemText}>{item.name}</Text>
                    </View>
                    {item.name !== 'Order new card' && (
                      <View style={styles.line} />
                    )}
                  </TouchableOpacity>
                );
              })}
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
  },
  modalContenItem: {
    // height: HEIGHT(60),
    flexDirection: 'row',
    alignItems: 'center',
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
  contentItemText: {
    paddingVertical: 20,
    color: 'white',
    fontSize: getFont(20),
  },
  ItemIcon: {
    marginHorizontal: 12,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
  textStyle: {
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
  },
});

export default ModalMenu;
