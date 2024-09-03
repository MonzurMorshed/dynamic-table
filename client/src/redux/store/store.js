import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "../state-slice/settingsSlice";
import listSlice from "../state-slice/listSlice";

const store = configureStore({
    reducer:{
        settings: settingsSlice,
        list: listSlice,
    }
});

export default store;