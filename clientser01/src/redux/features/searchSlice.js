import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name : 'search',
    initialState : { keyword : "", results : [],},

    reducers : {
                 setKeyword : (state, action) => {state.keyword = action.payload;},
                 setResults : (state, action) => {state.results = action.payload;}}})

export const {setKeyword, setResults} = searchSlice.actions;