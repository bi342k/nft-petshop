import { CONTRACT_ADDRESS, ABI } from '../Contract/contract';
import { ethers } from 'ethers';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//initialize the state
export const initialState = {
    provider: null,
    contract: null,
    accounts: [],
    signer: null,
    etherErrMsg: null,
}

//populate web3, contract, accounts and error messages in state object
export const loadBlockchain = createAsyncThunk(
    "loadBlockchain",
    async (_, thunkAPI) => {

        const { ethereum } = window;

        try {
            if (!ethereum) {
                alert("Please install Metamask first");
                return { etherErrMsg: "No Wallat Found" }
            } else {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

                return {
                    provider,
                    signer,
                    accounts,
                    contract
                }

            }

        } catch (error) {
            console.log("Error : ", error);
            return { etherErrMsg: error }
        }
    }

)

const connectionSlice = createSlice({
    name: "EtherConnect",
    initialState,
    reducers: {},
    extraReducers: {
        [loadBlockchain.fulfilled.toString()]:
            (state, { payload }) => {
                state.provider = payload?.provider;
                state.signer = payload?.signer;
                state.contract = payload?.contract;
                state.accounts = payload?.accounts;
            }
    }
});

export const etherReducer = connectionSlice.reducer;
