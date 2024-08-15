import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../redux/slices/booksSlice";
import authReducer from "../redux/slices/userAuth";
const Store = configureStore({
    reducer: {
        books: bookReducer,
        auth: authReducer
    }
})
export default Store;