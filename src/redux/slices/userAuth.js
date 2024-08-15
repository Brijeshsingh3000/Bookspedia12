import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        username: null,
        userid: null,
        favbooks: [],
        isAuthenticated: false
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload,
                state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null,
                state.username = null,
                state.userid = null,
                state.isAuthenticated = false,
                state.favbooks = []
        },
        setUser: (state, action) => {
            state.user = action.payload.user,
                state.username = action.payload.name,
                state.userid = action.payload.id
        },
        setUserFav: (state, action) => {
            state.favbooks = action.payload.favbooks
        },
    }
})
export const { login, logout, setUser, setUserFav } = authSlice.actions;
export default authSlice.reducer;