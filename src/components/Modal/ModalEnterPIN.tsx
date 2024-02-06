import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {HEIGHT, WIDTH, getFont} from '../../utils/functions';
import R from '../../assets/R';
import {TextInput} from 'react-native-gesture-handler';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
  setPin: SetStateFunction<string>;
  setModalVisibleScanNFC: SetStateFunction<boolean>;
}

const ModalEnterPIN = ({
  modalVisible,
  setModalVisible,
  setPin,
  setModalVisibleScanNFC,
}: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const _setPin = (pin: string) => {
    if (pin.length === 8) {
      setPin(pin);
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const enter = () => {
    setModalVisible(false);
    setModalVisibleScanNFC(true);
  };

  const cancel = () => {
    setModalVisible(false);
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
            <Text style={styles.textLabel}>Enter your PIN</Text>
            <TextInput
              placeholder="PIN Code"
              keyboardType="numeric"
              maxLength={8}
              secureTextEntry={true}
              autoFocus={true}
              style={styles.textInputStyle}
              onChangeText={text => _setPin(text)}
            />
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonCancel} onPress={cancel}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonEnter,
                  {
                    backgroundColor: isDisabled
                      ? R.colors.color_tone_5
                      : R.colors.color_tone_6,
                  },
                ]}
                disabled={isDisabled}
                onPress={enter}>
                <Text style={styles.textStyle}>Enter</Text>
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
    marginTop: 10,
    width: '100%',
    height: '26%',
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 16,
  },
  textStyle: {
    fontWeight: '600',
    fontSize: getFont(20),
    alignContent: 'center',
  },
});

export default ModalEnterPIN;
