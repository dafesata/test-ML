import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name : 'search',
    initialState:{
        value : ''
    },
    reducers : {
        changeValue :(state,action) => {
            state.value = action.payload
        }
    }
})

export const {  changeValue } = searchSlice.actions

export const getSearchValue = state => state.search.value;

export default searchSlice.reducer