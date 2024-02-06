import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH, getFont} from '../../utils/functions';
import R from '../../assets/R';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import axiosInstance from '../../utils/axios/axios';
import {setListTokens} from '../../store/StoreComponents/token';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
}

const ModalDeleteToken = ({modalVisible, setModalVisible}: Props) => {
  const dispatch = useDispatch();

  const infoTokenDelete = useSelector(
    (root: RootState) => root.tokens.infoTokenDelete,
  );

  const cancel = () => {
    setModalVisible(false);
  };

  const _deleteToken = async () => {
    console.log(infoTokenDelete);
    const response = await axiosInstance.get(
      `card/deleteToken/${infoTokenDelete.index}`,
    );
    if (response.data.isDelete) {
      dispatch(setListTokens(response.data.data.listToken));
    } else {
    }
    cancel();
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
          <View style={styles.container}>
            <View style={styles.viewTextContainer}>
              <Text style={[styles.textStyle, {fontSize: getFont(20)}]}>
                Are your sure remove{' '}
                <Text style={{color: R.colors.color_tone_6}}>
                  {infoTokenDelete.name}
                </Text>
              </Text>
              <Text style={[styles.textStyle, {marginVertical: 10}]}>
                {infoTokenDelete.address}
              </Text>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonCancel} onPress={cancel}>
                <Text style={[styles.textStyle, {fontSize: getFont(20)}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonEnter]}
                onPress={_deleteToken}>
                <Text style={[styles.textStyle, {fontSize: getFont(20)}]}>
                  Comfirm
                </Text>
              </TouchableOpacity>
            </View>
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
  container: {
    width: '95%',
    height: HEIGHT(220),
    backgroundColor: R.colors.color_tone_3,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewTextContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  textLabel: {
    marginTop: 8,
    color: R.colors.color_tone_4,
    fontSize: getFont(28),
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  textInputStyle: {
    width: WIDTH(340),
    backgroundColor: R.colors.color_tone_4,
    marginVertical: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: getFont(20),
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
    height: '24%',
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: R.colors.color_tone_5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 16,
  },
  buttonEnter: {
    flex: 1,
    backgroundColor: R.colors.color_tone_7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 16,
  },
  textStyle: {
    fontWeight: '600',
    alignContent: 'center',
    color: 'white',
  },
});

export default ModalDeleteToken;
