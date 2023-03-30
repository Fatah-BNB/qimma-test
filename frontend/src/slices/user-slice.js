import { createSlice } from "@reduxjs/toolkit"

const loginReducer = (state, action) => {
    state.value.isLogged = action.payload
}

const logoutReducer = (state) => {
    state.value.isLogged = false
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState: { value: { isLogged: false } },
    reducers: {
        loginRed: loginReducer,
        logoutRed: logoutReducer
    }
})

export const { loginRed, logoutRed } = userSlice.actions