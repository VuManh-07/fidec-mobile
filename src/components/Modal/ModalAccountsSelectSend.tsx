import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH, getFont} from '../../utils/functions';
import Svg, {Path} from 'react-native-svg';
import * as Icon from 'react-native-feather';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {navigate} from '../../navigate/navigation-service';
import R from '../../assets/R';
import Button from '../Button';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  typeSelectAccount: string;
  setModalVisible: SetStateFunction<boolean>;
  setModalVisibleSend: SetStateFunction<boolean>;
}

const ModalAccountsSelectSend = ({
  modalVisible,
  typeSelectAccount,
  setModalVisible,
  setModalVisibleSend,
}: Props) => {
  const accounts = useSelector((root: RootState) => root.accounts.accounts);
  const data = [];

  if (typeSelectAccount === 'Internal accounts') {
    data.push(...accounts);
  } else {
    data.push({
      name: 'manh',
      address: '0x363c00C3AB4D7f4947a7295F6a4176463331E817',
      type: '',
    });
  }

  const navigateSendDetails = (name?: string, address?: string) => {
    setModalVisible(false);
    setModalVisibleSend(false);
    navigate('Send', {address, name, typeSelectAccount});
  };

  const back = () => {
    setModalVisible(false);
    setModalVisibleSend(true);
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
              <Text style={styles.textStyle}>Choose your account</Text>
            </View>
            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={{paddingBottom: 40}}>
              {data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigateSendDetails(item.name, item.address)
                    }>
                    <View style={styles.modalContenItem}>
                      {item.type === 'Import' && (
                        <Icon.Download color="white" />
                      )}
                      <Text style={styles.contentItemText}>{item.name}</Text>
                      <Text style={styles.contentItemText}>
                        {item.address.slice(0, 6)}...{item.address.slice(-4)}
                      </Text>
                      <TouchableOpacity style={styles.contentItemCoppy}>
                        <Svg
                          width={WIDTH(30)}
                          height={HEIGHT(27)}
                          viewBox="0 0 33 32"
                          fill="none">
                          <Path
                            d="M23.3993 8.58567C23.5179 8.36325 23.5179 7.90356 23.3993 7.56251C23.1769 7.10283 22.6134 6.99903 21.8126 6.99903H21.694H8.48187H7.91839C6.79143 6.99903 6.22795 7.56251 6.22795 8.12599C6.22795 8.46704 6.45037 8.8081 6.79143 9.03053C7.13248 9.14915 7.47354 9.37158 7.91839 9.37158H21.8126C22.5986 9.38641 23.162 9.04535 23.3993 8.58567ZM6.21312 12.8859C6.21312 13.227 6.43555 13.6718 6.7766 13.7905C7.11766 13.9091 7.45871 14.0129 7.90356 14.0129H18.6394L18.8618 13.7905C19.2028 13.4494 19.5439 13.1083 19.8849 12.7673L21.2492 11.6403H7.90356C6.7766 11.759 6.21312 12.3224 6.21312 12.8859ZM29.3752 11.8628C29.7162 11.9814 30.0573 12.2038 30.3983 12.4262L31.4215 12.9897V2.49118C31.4215 0.563481 29.731 0 28.6041 0H3.27709C2.15012 0 0 0.682109 0 2.49118V30.2945C0 32.1036 2.15012 32.7857 3.27709 32.7857H28.5892C30.6207 32.7857 31.4067 31.3177 31.4067 30.2945V27.8033L29.9386 26.5578L28.9155 27.0174V30.2945C28.9155 30.2945 28.9155 30.4131 28.7968 30.5169C28.6782 30.6356 28.6782 30.5169 28.4558 30.5169H3.27709C3.15846 30.5169 2.49118 30.7394 2.49118 30.2945V2.49118C2.49118 2.37255 2.83223 2.37255 3.27709 2.37255H28.5892C28.7079 2.37255 29.0489 2.15012 29.0489 2.49118V11.759L29.3752 11.8628ZM34.921 26.2167L30.6356 22.1537C31.3177 21.1305 31.6587 20.0036 31.6587 18.758C31.6587 15.1398 28.6041 12.3224 24.7635 12.3224C20.9229 12.3224 17.8683 15.2585 17.8683 18.758C17.8683 22.3761 20.9229 25.1935 24.7635 25.1935C26.454 25.1935 27.922 24.6301 29.0638 23.7255L33.2454 27.6847C33.4678 27.9071 33.8089 27.9071 34.0313 27.6847L34.8172 26.8988C35.0396 26.7802 35.0396 26.4391 34.921 26.2167ZM19.7811 18.8766C19.7811 16.2816 22.0351 14.1315 24.7487 14.1315C27.4623 14.1315 29.7162 16.2816 29.7162 18.8766C29.7162 21.4716 27.4623 23.6217 24.7487 23.6217C21.9313 23.5031 19.7811 21.4716 19.7811 18.8766Z"
                            fill="white"
                          />
                        </Svg>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.line} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            {typeSelectAccount === 'External accounts' && (
              <View style={styles.itemButton}>
                <Button name="New Tx" func={() => navigateSendDetails()} />
              </View>
            )}
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
    paddingBottom: 10,
  },
  modalContenItem: {
    // height: HEIGHT(60),
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '400',
    fontSize: getFont(20),
    textAlign: 'center',
    paddingVertical: 8,
  },
  contentItemCoppy: {
    marginHorizontal: 16,
  },
  itemButton: {
    position: 'absolute',
    bottom: 10,
  },
});

export default ModalAccountsSelectSend;
