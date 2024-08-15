import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//action to fetch my books
const apiURL = import.meta.env.VITE_APP_API_URL;
export const getBooks = createAsyncThunk('getBooks', async () => {

    try {
        const res = await axios.get(`${apiURL}/api/v1/get`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
})

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        isLoading: false,
        data: null,
        iserror: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getBooks.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            }),

            builder.addCase(getBooks.rejected, (state, action) => {
                console.log('Error', action.payload);
                state.isLoading = false;
                state.iserror = true
            })

    }
})

export default booksSlice.reducer;