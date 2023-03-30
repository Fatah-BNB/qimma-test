import { configureStore } from "@reduxjs/toolkit"
import { userSlice } from "./slices/user-slice"

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
    }
})