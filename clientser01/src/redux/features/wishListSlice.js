import { createSlice } from "@reduxjs/toolkit";

export const wishListSlice = createSlice({
    name : 'wishList',
    initialState : { wishList : [],},
    reducers : {
                 setWishList : (state, action) => {state.wishList = action.payload;}}});

export const {setWishList} = wishListSlice.actions;