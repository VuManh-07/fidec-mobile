import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {getFont} from '../../utils/functions';
import R from '../../assets/R';

const data = [
  {id: 1, name: 'Internal accounts'},
  {id: 2, name: 'External accounts', line: 'none'},
];

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
  setModalVisibleAccountsSelectSend: SetStateFunction<boolean>;
  setTypeSelectAccount: SetStateFunction<string>;
}

const ModalSend = ({
  modalVisible,
  setModalVisible,
  setModalVisibleAccountsSelectSend,
  setTypeSelectAccount,
}: Props) => {
  const back = () => {
    setModalVisible(false);
  };
  const SelectType = (type: string) => {
    setTypeSelectAccount(type);
    setModalVisibleAccountsSelectSend(true);
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
              <Text style={styles.textStyle}>Transaction</Text>
            </View>
            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={{paddingBottom: 0}}>
              {data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => SelectType(item.name)}>
                    <View style={styles.modalContenItem}>
                      <Text style={styles.contentItemText}>{item.name}</Text>
                    </View>
                    {item.line !== 'none' && <View style={styles.line} />}
                  </TouchableOpacity>
                );
              })}
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
    paddingVertical: 4,
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
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    fontWeight: '300',
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
    fontWeight: '400',
    fontSize: getFont(20),
    textAlign: 'center',
    paddingVertical: 8,
  },
});

export default ModalSend;
