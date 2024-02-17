import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name : "orders",
    initialState : {orders : [],},

    reducers : {setOrders : (state, action) => { state.orders = action.payload;}}});

export const { setOrders } = orderSlice.actions;