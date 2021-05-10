import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './main/mainSlice';

export default configureStore({
    reducer: {
        main: mainReducer
    }
});
