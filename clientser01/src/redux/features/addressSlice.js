import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
    name : 'addresses',
    initialState : {addresses : [],},

    reducers : {
        setAddresses : (state, action) => {state.addresses = action.payload;}}});

export const {setAddresses} = addressSlice.actions;