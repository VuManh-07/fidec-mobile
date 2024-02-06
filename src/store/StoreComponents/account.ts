import {createSlice} from '@reduxjs/toolkit';

export type IAccount = {
  address: string;
  publicKey: string;
  name: string;
  type: string;
  tel: string;
  email: string;
};

type InitialState = {
  isLogin: boolean;
  balance: string;
  account: IAccount;
  accounts: [IAccount];
  checkGetAccount: boolean;
};

const initialState: InitialState = {
  isLogin: false,
  balance: '0',
  account: {
    address: '',
    publicKey: '',
    name: '',
    type: '',
    tel: '',
    email: '',
  },
  accounts: [
    {
      address: '',
      publicKey: '',
      name: '',
      type: '',
      tel: '',
      email: '',
    },
  ],
  checkGetAccount: false,
};

const AccountsSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setStateBalance: (state, action) => {
      state.balance = action.payload;
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setAccountSelect: (state, action) => {
      state.account = state.accounts[action.payload];
    },
  },
});

export const {setIsLogin, setStateBalance, setAccounts, setAccountSelect} =
  AccountsSlice.actions;

export default AccountsSlice.reducer;
