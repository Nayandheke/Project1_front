import { configureStore } from "@reduxjs/toolkit";
import userReducer,{setUser,clearUser} from "./userSlice";
import bookReducer,{setBook,clearBook} from "./bookSlice";

const store = configureStore({
    reducer:{
        user:userReducer,
        book:bookReducer,
    }
})

export default store
export {setUser, clearUser, setBook, clearBook}