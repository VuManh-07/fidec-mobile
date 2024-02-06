import NfcManager from 'react-native-nfc-manager';
import scp03 from './scp03';

const SELECT_APDU_HEADER = '00A40400';
const INITIALIZE_UPDATE_APDU = '80503000';
const EXTERNAL_AUTHENTICATE_APDU = '80823300';
let AID = 'A00001020304';

async function sendApduCommand(apduCommand: string) {
  const isoDepHandler = NfcManager.isoDepHandler;
  const byteArray = [];
  for (let i = 0; i < apduCommand.length; i += 2) {
    byteArray.push(parseInt(apduCommand.substr(i, 2), 16));
  }
  try {
    const response = await isoDepHandler.transceive(byteArray);
    return response.map(num => num.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    return {error};
  }
}

async function SecureChannel(): Promise<boolean> {
  try {
    await sendApduCommand(SELECT_APDU_HEADER + '06' + AID);
    const hostChallenge = await scp03.GetHostChallenge();
    const initializeUpdateApdu = INITIALIZE_UPDATE_APDU + '08' + hostChallenge;
    const initializeUpdateResponse = await sendApduCommand(
      initializeUpdateApdu,
    );
    await scp03.InitHostScp03(initializeUpdateResponse.toString().slice(0, 64));
    const hostCryptogram = await scp03.GetHostCryptogram();
    const cmdAuth = await scp03.GenerateCMAC(
      EXTERNAL_AUTHENTICATE_APDU,
      hostCryptogram.slice(0, 16),
    );
    const externalAuthenticateResponse = await sendApduCommand(cmdAuth);
    return await scp03.ChannelFinish(externalAuthenticateResponse.toString());
  } catch (error) {
    console.log('SecureChannel', error);
    return false;
  }
}

async function SecureMessage(
  INS?: string,
  data?: string,
  p1?: string,
  p2?: string,
) {
  const P1 = p1 ? p1 : '00';
  const P2 = p2 ? p2 : '00';
  const wrap = await scp03.Wrap('B0' + INS + P1 + P2, data);
  const responseBytes = await sendApduCommand(wrap);
  const unwrap = await scp03.Unwrap(responseBytes.toString());
  return unwrap;
}

export default {
  SecureChannel,
  SecureMessage,
};
