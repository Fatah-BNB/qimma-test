import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie'

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isLogged: false,
        firstname: 'me',
        lastname: 'me',
        email: 'me@me',
        phoneNumber: '012365478',
        wilaya: 'wilaya',
        wilayaCode : 0,
    },
    reducers: {
        checkLoginStatus: (state) => {
            const userCookie = Cookies.get('user')
            userCookie ? state.isLogged = true : state.isLogged = false;
        },
        fetchUserData: (state, action) => {
            state.firstname = action.payload.user_firstName
            state.lastname = action.payload.user_lastName
            state.email = action.payload.user_email
            state.phoneNumber = action.payload.user_phoneNumber
            state.wilaya = action.payload.wilaya_name
            state.wilayaCode = action.payload.wilaya_code
        }
    },
});

export const { checkLoginStatus, fetchUserData } = userSlice.actions

export default userSlice.reducer