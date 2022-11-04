import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/authSlice";
import chatReducer from "../Features/Chat/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
