import {createSlice} from '@reduxjs/toolkit';

export type INetwork = {
  chainId: number;
  name: string;
  rpc_provider: string;
  wss?: string;
  symbol: string;
  type_sign: [];
  namespace: string;
  logo?: string;
};

type InitialState = {
  network: INetwork;
  listNetImport: [INetwork];
  listNetNoImport: [INetwork];
  valueImportNetwork: number;
};

const initialState: InitialState = {
  network: {
    chainId: 0,
    name: '',
    rpc_provider: '',
    wss: '',
    symbol: '',
    type_sign: [],
    namespace: '',
    logo: '',
  },
  listNetImport: [
    {
      chainId: 0,
      name: '',
      rpc_provider: '',
      wss: '',
      symbol: '',
      type_sign: [],
      namespace: '',
      logo: '',
    },
  ],
  listNetNoImport: [
    {
      chainId: 0,
      name: '',
      rpc_provider: '',
      wss: '',
      symbol: '',
      type_sign: [],
      namespace: '',
      logo: '',
    },
  ],
  valueImportNetwork: 0,
};

const NetworlsSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setListNetImport: (state, action) => {
      state.listNetImport = action.payload;
    },
    setListNetNoImport: (state, action) => {
      state.listNetNoImport = action.payload;
    },
    setNetworkSelect: (state, action) => {
      state.network = state.listNetImport[action.payload];
    },
  },
});

export const {setListNetImport, setListNetNoImport, setNetworkSelect} =
  NetworlsSlice.actions;

export default NetworlsSlice.reducer;
