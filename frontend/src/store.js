import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/admin-slice"
import adminReducer from "./slices/admin-slice"

export const store = configureStore({
    reducer: {
        userReducer: userReducer,
        adminReducer: adminReducer,
    }
})