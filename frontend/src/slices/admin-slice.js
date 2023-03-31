import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie'

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState: {
        isLogged: false,
    },
    reducers: {
        checkAdminLoginStatus: state => {
            const userCookie = Cookies.get('admin')
            userCookie ? state.isLogged = true : state.isLogged = false;
        },
    },
});

export const { checkAdminLoginStatus } = adminSlice.actions

export default adminSlice.reducer