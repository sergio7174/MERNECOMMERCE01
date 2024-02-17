import {configureStore} from '@reduxjs/toolkit';
import { authSlice } from './features/authSlice';
import { productSlice } from './features/productSlice';
import { categorySlice } from './features/categorySlice';
import { cartSlice } from './features/cartSlice';
import { searchSlice } from './features/searchSlice';
import { wishListSlice } from './features/wishListSlice';
import { addressSlice } from './features/addressSlice';
import { orderSlice } from './features/orderSlice';
import { tagsSlice } from './features/tagsSlice';

const store = configureStore({reducer : {
    user : authSlice.reducer,
    products : productSlice.reducer,
    categories : categorySlice.reducer,
    tags : tagsSlice.reducer,
    cart : cartSlice.reducer,
    search : searchSlice.reducer,
    wishList : wishListSlice.reducer,
    addresses : addressSlice.reducer,
    orders : orderSlice.reducer,
}});

export default store;