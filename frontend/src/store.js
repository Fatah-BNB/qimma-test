import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/user-slice"
import adminReducer from "./slices/admin-slice"
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"

const persistConfig = {
    key: "userKey",
    version: 1,
    storage
}

const reducer = combineReducers({
    userReducer: userReducer,
    adminReducer: adminReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer
})