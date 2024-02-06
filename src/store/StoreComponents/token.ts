import {createSlice} from '@reduxjs/toolkit';

export interface IToken {
  address?: string;
  name?: string;
  symbol?: string;
  type?: string;
  logo?: string;
  chainId?: number;
}

export interface ICurrentToken {
  address_account?: string;
  address_contract?: string;
  symbol?: string;
  type: string;
  logo?: string;
}

type InitialState = {
  infoTokenDelete: {name: string; address: string; index: number};
  listTokens: Array<IToken>;
  currentToken: ICurrentToken;
};

const initialState: InitialState = {
  infoTokenDelete: {name: '', address: '', index: 0},
  listTokens: [],
  currentToken: {type: ''},
};

const TokensSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setIndexTokenDelete: (state, action) => {
      state.infoTokenDelete = action.payload;
    },
    setListTokens: (state, action) => {
      state.listTokens = action.payload;
    },
    setCurrentToken: (state, action) => {
      state.currentToken = action.payload;
    },
  },
});

export const {setIndexTokenDelete, setListTokens, setCurrentToken} =
  TokensSlice.actions;

export default TokensSlice.reducer;
