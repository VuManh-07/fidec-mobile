import {ethers} from 'ethers';
import {parseEther} from 'ethers/lib/utils';
import * as RLP from '@ethereumjs/rlp';
import {rlp, toBuffer, unpadBuffer} from 'ethereumjs-util';
import keccak256 from 'keccak256';
import format from './format';
import {Sign} from '../nfc/wallet';
import {Transaction} from 'ethereumjs-tx';
import {ec as EC} from 'elliptic';
const ec = new EC('secp256k1');
import abiERC20 from '../data/abi/abiERC20.json';
import abiERC721 from '../data/abi/abiERC721.json';
import abiERC1155 from '../data/abi/abiERC1155.json';

const TRANSACTION_TYPE_2 = 2;
const TRANSACTION_TYPE_2_BUFFER = Buffer.from(
  TRANSACTION_TYPE_2.toString(16).padStart(2, '0'),
  'hex',
);

interface INetwork {
  chainId: number;
  name: string;
  rpc_provider: string;
  wss?: string;
  symbol: string;
  type_sign: [];
  namespace: string;
  logo?: string;
}

type IAccount = {
  address: string;
  publicKey: string;
  name: string;
  type: string;
  tel: string;
  email: string;
};

interface ITx {
  chainId?: string;
  nonce: string;
  gasPrice?: string;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
  gasLimit: string;
  to: string;
  value: string;
  data: string;
  accessList?: [];
  v: string;
  r: string;
  s: string;
}

interface ISigned {
  msgHash: string;
  r: string;
  s: string;
}

class Provider {
  private url: string;
  account: IAccount;
  provider: any;
  contract: string;
  typeToken: string;
  chainId: number;
  private Tx: ITx;
  private signed: ISigned;
  constructor(
    network: INetwork,
    account: IAccount,
    typeToken: string,
    contract?: string,
  ) {
    this.chainId = network.chainId;
    this.url = network.rpc_provider;
    this.account = account;
    this.provider = new ethers.providers.JsonRpcProvider(this.url);
    this.contract = contract ?? '';
    this.typeToken = typeToken;
    this.Tx = {
      chainId: '',
      nonce: '',
      gasPrice: '',
      maxPriorityFeePerGas: '',
      maxFeePerGas: '',
      gasLimit: '',
      to: '',
      value: '',
      data: '',
      accessList: [],
      v: '',
      r: '',
      s: '',
    };
    this.signed = {msgHash: '', r: '', s: ''};
  }
  async getAllERC721TokenIds(address: string, contract: any) {
    const balance = await contract.balanceOf(address);
    const tokenIds = [];

    for (let i = 0; i < balance.toNumber(); i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(address, i);
      tokenIds.push(tokenId);
    }

    return tokenIds;
  }
  async getBalance(type: string) {
    try {
      if (type === 'nativecoin') {
        const amount = await this.provider.getBalance(this.account.address);
        const balance =
          Number(amount) < 10 ** 12
            ? '0'
            : (Number(amount) / 10 ** 18).toString().slice(0, 8);
        return {balance};
      } else if (type === 'ERC20') {
        const contract = new ethers.Contract(
          this.contract,
          abiERC20.abi,
          this.provider,
        );

        const balance = await contract.balanceOf(this.account.address);

        return {balance: Number(balance)};
      } else if (type === 'ERC721') {
        const contract = new ethers.Contract(
          this.contract,
          abiERC721.abi,
          this.provider,
        );
        const tokenIds = [];
        const balance = await contract.balanceOf(this.account.address);

        for (let i = 0; i < balance.toNumber(); i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(
            this.account.address,
            i,
          );
          tokenIds.push(tokenId);
        }

        const tokenInfo = await Promise.all(
          tokenIds.map(async tokenId => {
            const tokenUri = await contract.tokenURI(tokenId);
            return {tokenId: tokenId.toString(), tokenUri};
          }),
        );

        return {
          balance,
          ...tokenInfo,
        };
      } else if (type === 'ERC1155') {
        const contract = new ethers.Contract(
          this.contract,
          abiERC1155.abi,
          this.provider,
        );
        const allTokenIds = await contract.balanceOfBatch(
          [this.account.address],
          [0],
        );
        const tokenInfo = await Promise.all(
          allTokenIds.map(async (tokenId: any) => {
            const tokenUri = await contract.uri(tokenId);
            return {tokenId: tokenId.toString(), tokenUri};
          }),
        );
        return tokenInfo;
      }
    } catch (error) {
      console.error('Eror get balance:', error);
      throw error;
    }
  }
  async getGas(tx: any) {
    const gasLimit = await this.provider.estimateGas(tx);
    const feeData = await this.provider.getFeeData();
    return {
      gasLimit: gasLimit.toHexString(),
      lastBaseFe: feeData.lastBaseFeePerGas._hex,
      maxFeePerGas: feeData.maxFeePerGas._hex,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas._hex,
      gasPrice: feeData.gasPrice._hex,
    };
  }

  async createTx(addressTo: string, amount: string, typeSign: string) {
    let data = '0x';
    let value = amount;
    let to = addressTo;
    if (this.typeToken === 'ERC20') {
      const contract = new ethers.Contract(
        this.contract,
        abiERC20.abi,
        this.provider,
      );
      data = contract.interface.encodeFunctionData('transfer', [
        addressTo,
        amount,
      ]);
      console.log(data, 'errcc20');
      to = this.contract;
      value = '0';
    } else if (this.typeToken === 'ERC721') {
      const contract = new ethers.Contract(
        this.contract,
        abiERC721.abi,
        this.provider,
      );
      const _data = await contract.transferFrom(addressTo, amount);
      data = _data.encodeABI();
      to = this.contract;
      value = '0';
    } else if (this.typeToken === 'ERC1155') {
      const contract = new ethers.Contract(
        this.contract,
        abiERC1155.abi,
        this.provider,
      );
      const _data = await contract.safeTransferFrom(addressTo, amount);
      data = _data.encodeABI();
      to = this.contract;
      value = '0';
    }
    const nonce = await this.provider.getTransactionCount(this.account.address);
    const gas: any = await this.getGas({to, data, nonce});
    if (typeSign === 'EIP-1559') {
      const _tx: ITx = {
        chainId: format.formatFieldTx('0x' + this.chainId.toString(16)),
        nonce: format.formatFieldTx('0x' + nonce.toString(16)),
        maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
        maxFeePerGas: gas.maxFeePerGas,
        gasLimit: gas.gasLimit,
        to,
        value: format.formatFieldTx(parseEther(value).toHexString()),
        data,
        accessList: [],
        v: '0x',
        r: '0x',
        s: '0x',
      };
      this.Tx = _tx;
      return this.Tx;
    } else {
      const _tx: ITx = {
        nonce: format.formatFieldTx('0x' + nonce.toString(16)),
        gasLimit: gas.gasLimit,
        gasPrice: gas.gasPrice,
        to,
        value: format.formatFieldTx(parseEther(value).toHexString()),
        data,
        v: '0x',
        r: '0x',
        s: '0x',
      };
      this.Tx = _tx;
      return this.Tx;
    }
  }

  async signTx(pin: string, index: Number, typeSign: string) {
    if (typeSign === 'EIP-1559') {
      const messageToBeSigned_sign = Buffer.concat([
        TRANSACTION_TYPE_2_BUFFER,
        Buffer.from(RLP.encode(Object.values(this.Tx).slice(0, 9))),
      ]);
      try {
        const _msgHash = keccak256(messageToBeSigned_sign).toString('hex');
        const result: any = await Sign(_msgHash, pin, index);
        this.signed = {msgHash: _msgHash, ...result};
        return {msgHash: _msgHash, ...result};
      } catch (error) {
        throw error;
      }
    } else {
      const tx = new Transaction(this.Tx);
      const items = [
        ...tx.raw.slice(0, 6),
        toBuffer(this.chainId),
        unpadBuffer(toBuffer(0)),
        unpadBuffer(toBuffer(0)),
      ];
      try {
        const rlp_encoded = rlp.encode(items);
        const _msgHash = keccak256(rlp_encoded).toString('hex');
        const result: any = await Sign(_msgHash, pin, index);
        this.signed = {msgHash: _msgHash, ...result};
        return {msgHash: _msgHash, ...result};
      } catch (error) {
        throw error;
      }
    }
  }
  async sendTx(type_sign: string) {
    const key: any = ec.keyFromPublic(this.account.publicKey, 'hex');
    const msgHashBuffer: any = Buffer.from(this.signed.msgHash, 'hex');
    const recoveryParam = ec.getKeyRecoveryParam(
      msgHashBuffer,
      {r: this.signed.r, s: this.signed.s},
      key.getPublic(),
    );
    const vs = format.checkS(recoveryParam, `0x${this.signed?.s}`);
    const v = format.formatFieldTx(vs.v);
    const s = format.formatFieldTx(vs.s);
    const r = format.formatFieldTx(`0x${this.signed?.r}`);
    if (type_sign === 'EIP-1559') {
      const txParamSigned = {
        chainID: this.Tx.chainId,
        nonce: this.Tx.nonce,
        maxPriorityFeePerGas: this.Tx.maxPriorityFeePerGas,
        maxFeePerGas: this.Tx.maxFeePerGas,
        gasLimit: this.Tx.gasLimit,
        to: this.Tx.to,
        value: this.Tx.value,
        data: this.Tx.data,
        accessList: this.Tx.accessList,
        v,
        r,
        s,
      };
      const rawTransaction = Buffer.concat([
        TRANSACTION_TYPE_2_BUFFER,
        Buffer.from(RLP.encode(Object.values(txParamSigned))),
      ]);
      console.log(`0x${rawTransaction.toString('hex')}`);
      try {
        const receipt = await this.provider.sendTransaction(
          `0x${rawTransaction.toString('hex')}`,
        );
        console.log(receipt.hash);
        return receipt.hash;
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      console.log(Number(v));
      const txParamSigned = {
        nonce: this.Tx.nonce,
        gasPrice: this.Tx.gasPrice,
        gasLimit: this.Tx.gasLimit,
        to: this.Tx.to,
        value: this.Tx.value,
        data: this.Tx.data,
        v: format.formatFieldTx(
          '0x' + (Number(v) + this.chainId * 2 + 35).toString(16),
        ),
        r,
        s,
      };
      const rawTransaction = Buffer.concat([
        Buffer.from(RLP.encode(Object.values(txParamSigned))),
      ]);
      console.log(`0x${rawTransaction.toString('hex')}`);
      try {
        const receipt = await this.provider.sendTransaction(
          `0x${rawTransaction.toString('hex')}`,
        );
        console.log(receipt.hash);
        return receipt.hash;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
  // Check if the bytecode corresponds to ERC-20 functions
  private isERC20(bytecode: string) {
    return bytecode.includes('a9059cbb');
  }

  // Check if the bytecode corresponds to ERC-721 functions
  private isERC721(bytecode: string) {
    return bytecode.includes('80ac58cd') && bytecode.includes('095ea7b3');
  }

  // Check if the bytecode corresponds to ERC-1155 functions
  private isERC1155(bytecode: string) {
    return bytecode.includes('91b7c8f1') && bytecode.includes('dabb');
  }

  // Get token information (name and symbol) for a given contract address and type
  private async getTokenInfo(
    contractAddress: string,
    type: string,
  ): Promise<{name: string; symbol: string; type: string}> {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        [
          'function name() view returns (string)',
          'function symbol() view returns (string)',
        ],
        this.provider,
      );

      const name = await contract.name();
      const symbol = await contract.symbol();

      return {name, symbol, type};
    } catch (error) {
      console.error(`Error getting token information for ${type}:`, error);
      throw error;
    }
  }

  // Check the type of the token based on its bytecode
  async checkTypeToken(contractAddress: string) {
    try {
      const bytecode = await this.provider.getCode(contractAddress);

      // Check if it's ERC-20
      if (this.isERC20(bytecode)) {
        return this.getTokenInfo(contractAddress, 'ERC-20');
      }
      // Check if it's ERC-721
      else if (this.isERC721(bytecode)) {
        return this.getTokenInfo(contractAddress, 'ERC-721');
      }
      // Check if it's ERC-1155
      else if (this.isERC1155(bytecode)) {
        return this.getTokenInfo(contractAddress, 'ERC-1155');
      } else {
        return {error: 'Unable to determine token type.'};
      }
    } catch (error) {
      throw error;
    }
  }
}

export default Provider;
