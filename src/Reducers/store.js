import {configureStore} from '@reduxjs/toolkit'
import searchReducer from './Search/searchSlice'

export default configureStore({
    reducer : {
        search: searchReducer,
    },
})