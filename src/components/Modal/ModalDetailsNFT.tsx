import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {getFont} from '../../utils/functions';
import R from '../../assets/R';

const data = {
  name: 'YuGiYn #1329',
  description: 'A Ticket towards YuGiYn ecosystem',
  image:
    'https://assets.yu-gi-yn.com/production/images/6c6a3a90c0222892ad52bf8d9f54dbaf35f6ac1e81b222f1e807825c1e7d574f.png',
  attributes: [
    {trait_type: 'Type', value: 'Re:HACKERS++'},
    {trait_type: 'Eyes', value: 'No Brow Puppy Eyes TRI-CLR'},
    {trait_type: 'Head', value: 'Pacth GRN'},
    {trait_type: 'Hair', value: 'Quiff RED 01'},
    {trait_type: 'Mask', value: 'Robot ORN'},
    {trait_type: 'Clothing', value: 'T-Shirt 013'},
    {trait_type: 'Neck', value: 'Dice Gems Choker GLD'},
    {trait_type: 'Background', value: 'FUSHIZOME'},
  ],
};

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
}

const ModalDetailsNFT = ({modalVisible, setModalVisible}: Props) => {
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleModalPress = (event: any) => {
    // Check if the click event target is the modal content
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={handleModalPress}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHearder}>
              <TouchableOpacity onPress={closeModal}>
                <View style={styles.lineBack} />
              </TouchableOpacity>
              <Text style={styles.label}>
                NFT Collection 1 - 0xBf54.....A940
              </Text>
              <Text style={styles.text}>ID 10215</Text>
            </View>
            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={{paddingBottom: 40}}>
              {/* <View style={styles.modalContent}> */}
              <Text style={styles.text}>name : {data.name}</Text>
              <Text style={styles.text}>description: {data.description}</Text>
              <Text style={styles.text}>image: {data.image}</Text>
              <Text style={styles.text}>
                attributes: {JSON.stringify(data.attributes)}
              </Text>
              {/* </View> */}
              <Image source={{uri: data.image}} style={styles.image} />
            </ScrollView>
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
    top: '30%',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: R.colors.color_tone_2,
    paddingBottom: 10,
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
    padding: 10,
  },
  lineBack: {
    width: '20%',
    backgroundColor: 'black',
    borderRadius: 5,
    paddingHorizontal: '12%',
    paddingVertical: 4,
    marginVertical: 4,
  },
  label: {
    color: 'white',
    fontWeight: '400',
    fontSize: getFont(20),
    textAlign: 'center',
    paddingTop: 8,
  },
  image: {
    width: '100%',
    height: 400,
    // resizeMode: 'cover',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: getFont(18),
    fontWeight: '400',
    color: 'white',
  },
});

export default ModalDetailsNFT;
