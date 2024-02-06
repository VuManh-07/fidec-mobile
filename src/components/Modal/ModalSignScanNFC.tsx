import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {getFont} from '../../utils/functions';
import {Path, Svg} from 'react-native-svg';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import smartcard from '../../nfc/smartcard';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import R from '../../assets/R';
import Provider from '../../utils/web3';
// import {navigate} from '../../navigate/navigation-service';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  modalVisible: boolean;
  setModalVisible: SetStateFunction<boolean>;
  pin: string;
  typeSend: string;
  provider: Provider;
}

const ModalSignScanNFC = ({
  modalVisible,
  setModalVisible,
  pin,
  typeSend,
  provider,
}: Props) => {
  const account = useSelector((root: RootState) => root.accounts.account);
  const accounts = useSelector((root: RootState) => root.accounts.accounts);

  const index = accounts.findIndex(item => item.address === account.address);

  const signTx = async () => {
    const data = await provider.signTx(pin, index, typeSend);
    return data;
  };

  // const sendTx = async () => {
  //   await provider.sendTx(typeSend);
  // };

  const scanNFC = async () => {
    console.log(111111111111111);
    console.log(typeSend);
    try {
      await NfcManager.requestTechnology(NfcTech.IsoDep);
      await smartcard.SecureChannel();
      await provider.signTx(pin, index, typeSend);
      await provider.sendTx(typeSend);
      setModalVisible(false);
    } catch (error) {
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  };

  const back = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    scanNFC();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              <Text style={styles.label}>NFC</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.contentNFCView}>
                <Svg width="210" height="210" viewBox="0 0 210 210" fill="none">
                  <Path
                    d="M94.211 169.795C90.299 169.795 87.1328 172.961 87.1328 176.872C87.1328 180.794 90.299 183.96 94.211 183.96C98.1331 183.96 101.302 180.794 101.302 176.872C101.302 172.961 98.1331 169.795 94.211 169.795ZM37.326 115.725C35.0201 115.766 33.1773 117.665 33.2053 119.965V176.356C33.2053 187.515 42.3247 196.646 53.4879 196.646H131.674C133.992 196.646 135.873 194.763 135.873 192.46C135.873 190.139 133.992 188.256 131.674 188.256H53.4879C46.8195 188.256 41.5688 183.021 41.5688 176.356V165.38H123.361C125.759 165.509 127.774 163.601 127.774 161.203C127.774 158.788 125.759 156.879 123.361 157.027H41.5688V119.965C41.5968 117.609 39.6879 115.7 37.326 115.725ZM49.324 81.29C44.9361 81.1297 43.2919 86.9754 47.125 89.1233L78.9246 107.482C80.9276 108.78 83.6179 108.144 84.8243 106.062C86.018 103.993 85.2341 101.342 83.1139 100.242L51.2991 81.8856C50.7035 81.5293 50.029 81.3308 49.324 81.29ZM30.5405 38.3749C29.7693 38.3444 29.0134 38.5429 28.3389 38.9297C21.276 43.0118 16.9136 50.5779 16.9136 58.7445C16.8601 61.9791 20.347 64.0482 23.1569 62.4423C24.4957 61.7017 25.3178 60.269 25.2924 58.7445C25.2924 53.5605 28.0488 48.7786 32.5309 46.1777C36.2138 44.0705 34.7808 38.464 30.5405 38.3749ZM24.8546 23.5431C24.4015 23.5431 23.9536 23.594 23.5285 23.7391C6.64121 28.2589 -3.44792 45.7323 1.08506 62.6154C1.78754 65.3843 5.00975 66.6567 7.42004 65.0967C8.95733 64.0889 9.66235 62.2031 9.1584 60.4446C5.80639 47.9133 13.1747 35.1632 25.6894 31.8116C30.5151 30.7249 29.7973 23.6475 24.8546 23.5431ZM92.8595 19.5781C92.8442 19.5781 92.8442 19.5781 92.8442 19.5883C87.4637 20.0388 87.8734 28.0451 93.282 27.9382H102.325C104.735 28.0705 106.751 26.1644 106.751 23.7645C106.751 21.3519 104.735 19.4407 102.325 19.5858H93.282C93.1369 19.5781 92.9918 19.5781 92.8595 19.5781ZM53.4879 0C53.3403 0 53.1825 0.0127244 53.0349 0.027994C41.9277 0.267217 32.9279 9.41114 32.9279 20.5834C32.821 22.9578 34.7299 24.9581 37.1046 24.9581C39.492 24.9581 41.4008 22.9578 41.2939 20.5834C41.2939 13.7579 46.6618 8.39062 53.4905 8.39062H134.949C141.618 8.39062 146.868 13.6281 146.868 20.2932V65.2519L79.4463 26.3374C75.7762 24.2175 71.5333 23.4744 67.7155 24.1514C63.885 24.8181 60.4643 26.8948 58.4103 30.4348L28.2346 82.6821C24.1241 89.785 27.863 98.7075 35.2186 102.947L124.3 154.391C129.856 157.597 136.667 157.666 141.439 154.454C141.638 155.21 141.824 155.861 142.012 156.722C142.727 159.877 143.562 163.652 145.247 167.408C148.614 174.923 156.303 182 170.17 182C172.557 182.105 174.545 180.206 174.545 177.824C174.545 175.437 172.557 173.528 170.17 173.648C158.78 173.648 155.349 169.523 152.87 163.985C151.623 161.211 150.867 157.992 150.164 154.879C149.462 151.762 148.971 148.766 147.342 145.941C147.342 145.941 147.326 145.931 147.314 145.916L135.583 126.073C134.827 124.785 134.43 123.543 134.389 122.757C134.336 121.991 134.389 121.762 134.947 121.207C136.112 120.044 137.863 120.014 138.897 121.118L156.156 139.485C156.767 140.126 157.548 140.564 158.411 140.722C158.411 140.722 169.414 143.531 172.781 149.39C175.619 154.067 182.684 149.995 180.045 145.201C174.466 135.553 163.766 133.377 161.513 132.967L144.998 115.377C142.834 113.086 139.92 111.972 137.016 111.982C134.099 111.997 131.21 113.109 129.034 115.283C126.822 117.499 125.868 120.561 126.026 123.236C126.171 125.91 127.164 128.262 128.398 130.344L137.879 146.379C136.341 148.555 132.455 149.43 128.479 147.135L39.3978 95.7198C35.2491 93.3199 34.1089 89.2531 35.4884 86.866L57.5068 48.743C57.5195 48.743 57.5195 48.743 57.5195 48.743L144.494 98.9646C146.509 100.196 149.134 99.5372 150.312 97.4783C151.493 95.4398 150.75 92.8262 148.668 91.7115L61.6936 41.5001L65.659 34.6365C67.036 32.2493 71.1083 31.2008 75.2569 33.6007L164.351 85.0158C168.502 87.4157 169.64 91.4876 168.263 93.8722L159.475 109.086C158.785 109.895 158.426 110.926 158.467 111.989C158.467 113.58 159.38 115.021 160.813 115.728C161.809 116.537 165.573 119.64 170.663 123.602C176.482 128.135 183.084 133.115 187.632 135.611C187.604 135.601 189.393 137.719 190.6 141.17C191.819 144.628 192.855 149.148 193.623 153.576C195.189 162.415 195.81 170.818 195.81 170.818L195.85 171.454L201.458 185.744C202.002 187.831 201.259 190.088 198.66 192.783C196.062 195.468 191.768 198.082 187.075 199.713C182.366 201.344 177.276 201.993 173.181 201.398C169.179 200.815 166.339 199.265 164.59 196.372C162.974 192.57 160.231 189.92 157.446 188.012C154.568 186.024 151.613 184.642 149.001 183.079C147.029 181.807 144.377 182.428 143.155 184.441C141.936 186.469 142.638 189.103 144.705 190.261C147.754 192.086 150.592 193.458 152.687 194.898C154.794 196.344 156.107 197.672 156.955 199.82L157.062 200.097L157.232 200.385C160.442 205.928 166.128 208.816 171.987 209.679C177.833 210.539 184.064 209.61 189.818 207.61C195.571 205.622 200.847 202.561 204.692 198.578C208.536 194.593 211.068 189.159 209.556 183.553L209.503 183.324L204.054 169.456C204.013 168.785 203.443 161.071 201.852 152.1C201.033 147.417 199.971 142.582 198.51 138.406C197.054 134.217 195.583 130.438 191.659 128.28C188.385 126.49 181.519 121.426 175.817 116.985C172.636 114.519 170.037 112.412 168.116 110.862L175.512 98.0306C179.62 90.9277 175.896 82.0052 168.541 77.7653L155.232 70.0771V20.2932C155.232 9.1312 146.112 0 134.949 0H53.4879Z"
                    fill="white"
                  />
                </Svg>
              </View>
              <View style={styles.textViewNFC}>
                <Text style={styles.textNFC}>SCAN YOUR CARD</Text>
                <Text style={styles.textNFC}>NEAR TOP BACK OF</Text>
                <Text style={styles.textNFC}>YOUR PHONE</Text>
              </View>
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
  modalView: {
    position: 'absolute',
    bottom: 0,
    top: '25%',
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
  lineBack: {
    // height: 8,
    paddingHorizontal: '12%',
    paddingVertical: 4,
    marginVertical: 4,
    width: '20%',
    backgroundColor: 'black',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: R.colors.color_tone_2,
    alignItems: 'center',
  },
  contentNFCView: {
    marginTop: 40,
  },
  textNFC: {
    fontSize: getFont(26),
    fontWeight: '300',
    color: 'white',
  },
  textViewNFC: {
    marginTop: 20,
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: getFont(20),
    textAlign: 'center',
    paddingVertical: 8,
  },
});

export default ModalSignScanNFC;