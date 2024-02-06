import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {HEIGHT, WIDTH, getFont} from '../../utils/functions';
import Button from '../Button';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import R from '../../assets/R';
import axiosInstance from '../../utils/axios/axios';
import {
  setListNetImport,
  setListNetNoImport,
  setNetworkSelect,
} from '../../store/StoreComponents/network';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
  setModalVisibleNetwork: SetStateFunction<boolean>;
}

const ModalImportNetwork = ({
  modalVisible,
  setModalVisible,
  setModalVisibleNetwork,
}: Props) => {
  const [select, setSelect] = useState<Number>();

  const dispatch = useDispatch();

  const listNetNoImport = useSelector(
    (root: RootState) => root.networks.listNetNoImport,
  );

  const _importNetwork = async () => {
    const response = await axiosInstance.get(`card/importNetwork/${select}`);
    console.log(response.data);
    dispatch(setListNetImport(response.data.data.listNetImport));
    dispatch(setListNetNoImport(response.data.data.listNetNoImport));
    dispatch(setNetworkSelect(response.data.data.listNetImport.length - 1));
    setModalVisible(false);
  };

  const back = () => {
    setModalVisible(false);
    setModalVisibleNetwork(true);
    setSelect(undefined);
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
              <Text style={styles.textStyle}>Import Network</Text>
            </View>
            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={{paddingBottom: 70}}>
              {listNetNoImport.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelect(item.chainId)}>
                    <View
                      style={[
                        styles.modalContenItem,
                        {
                          backgroundColor:
                            select === item.chainId
                              ? R.colors.color_tone_5
                              : R.colors.color_tone_2,
                        },
                      ]}>
                      <Text style={styles.contentItemText}>{item.name}</Text>
                    </View>
                    <View style={styles.line} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.itemButton}>
            <Button
              name="Comfirm"
              colorButton="#6B6B6B"
              width={WIDTH(200)}
              height={HEIGHT(60)}
              func={_importNetwork}
            />
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
    top: '20%',
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
    paddingBottom: 10,
  },
  modalContenItem: {
    // height: HEIGHT(60),
    // marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.color_tone_7,
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
  itemButton: {
    position: 'absolute',
    bottom: 10,
  },
});

export default ModalImportNetwork;
