import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name : 'cart',
    initialState : {cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],},

    reducers : {setCart : (state, action) => { state.cart = action.payload}}})

export const {setCart} = cartSlice.actions ;