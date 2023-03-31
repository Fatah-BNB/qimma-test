import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie'

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isLogged: false,
    },
    reducers: {
        checkLoginStatus: state => {
            const userCookie = Cookies.get('user')
            userCookie ? state.isLogged = true : state.isLogged = false;
        },
    },
});

export const { checkLoginStatus } = userSlice.actions

export default userSlice.reducer