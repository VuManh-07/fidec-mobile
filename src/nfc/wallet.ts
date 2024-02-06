import smartCard from './smartcard';
import utils from './utils';
import {ethers} from 'ethers';

const GENERATE_SEED = '00';
const IMPORT_SEED = '01';

const RESET_WALLET = '02';
const RESET_WITH_AUTH = '23';

const GET_ACCOUNT = '03';
const SELECT_ACCOUNT = '04';
const RLP_ENCODE = '05';
const IMPORT_HASH = '10';
const TRANSACTION = '06';

const VERIFY_PIN = '07';
const CHANGE_PIN = '08';

const GET_INFOMATION = '0E';
const GET_STATUS = '0F';
const GENUINE_CHECK = '11';

const IMPORT_TOKEN = '12';
const GET_TOKEN = '13';
const DELETE_TOKEN = '14';

const IMPORT_ACCOUNT = '16';
const DELETE_ACCOUNT = '18';
const IMPORT_NAME_ACCOUNT = '19';
const GET_NAME_ACCOUNT = '1A';

const GET_NETWORK = '20';
const IMPORT_NETWORK = '21';
const DELETE_NETWORK = '22';
const TRANSACTION_SINGLE = '24';

const WalletNonActived = '0001';
const WalletActived = '0002';

export async function VerifyPin(pin: string): Promise<{
  isVerify: boolean;
  times?: number;
  message?: string;
}> {
  try {
    const pinHex = utils.String_To_HexString(pin);
    const result: any = await smartCard.SecureMessage(
      VERIFY_PIN,
      pinHex,
      '',
      '',
    );
    if (result.sw === '9000') {
      return {
        isVerify: true,
        times: utils.HexString_To_Int(result.data),
        message: 'Accurate authentication',
      };
    } else {
      return {
        isVerify: false,
        times: utils.HexString_To_Int(result.data),
        message: 'Inaccurate authentication',
      };
    }
  } catch (error) {
    return {isVerify: false};
  }
}

export async function GetIdCard() {
  var result = await smartCard.SecureMessage(GET_INFOMATION);
  var data = utils.HexString_To_String(result.data);
  return data;
}

/**
 *
 * @param {String} pin - pin code of Wallet
 * @returns {Object} - {r:"", s:""}
 */
export async function Sign(
  hash: string,
  pin: string,
  index: Number,
): Promise<{r: string; s: string}> {
  const indexHex = utils.Int_To_HexString(index);
  const pinHex = utils.String_To_HexString(pin);
  const result = await smartCard.SecureMessage(
    TRANSACTION,
    indexHex + pinHex + hash,
  );
  if (result.sw === '9000') {
    return {
      r: result.data.slice(0, 64),
      s: result.data.slice(64, 128),
    };
  } else {
    return {r: '', s: ''};
  }
}

export async function GetAccount(
  index: number,
): Promise<{publickey: string; address: string; index: number} | undefined> {
  const _index = utils.Int_To_HexString(index);
  var result_1 = await smartCard.SecureMessage(GET_ACCOUNT, '', _index);
  if (result_1.sw === '9000') {
    let address = '';
    try {
      address = ethers.utils.computeAddress(`0x${result_1.data}`);
    } catch {
      console.log('Get Acount Error: Cannot Convert Address from Public Key!');
      return;
    }
    return {
      publickey: result_1.data,
      address: address,
      index: utils.HexString_To_Int(index),
    };
  } else {
    return;
  }
}

export async function ImportAccount(
  privatekey: string,
  index: number,
): Promise<{publickey: string; address: string; index: number} | undefined> {
  const _index = utils.Int_To_HexString(index);
  var result_1 = await smartCard.SecureMessage(
    IMPORT_ACCOUNT,
    privatekey,
    _index,
  );
  if (result_1.sw === '9000') {
    const account_import = await GetAccount(index);
    return account_import;
  } else {
    return;
  }
}

export async function DeleteAccount(index: number): Promise<boolean> {
  try {
    const indexHex = utils.Int_To_HexString(index);
    const result: any = await smartCard.SecureMessage(
      DELETE_ACCOUNT,
      '',
      indexHex,
    );
    if (result.sw === '9000') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
