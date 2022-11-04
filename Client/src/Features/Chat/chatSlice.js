import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  selectedChat: null,
  chat: [],
  user: JSON.parse(localStorage.getItem("user")),
  messages: [],
  message: "",
};

export const getChat = createAsyncThunk(
  "chat/getChat",
  async (id, thunkAPI) => {
    try {
      return await chatService.getChat(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllChat = createAsyncThunk(
  "chat/getAllChat",
  async (thunkAPI) => {
    try {
      console.log("chat slice");
      return await chatService.getAllChat();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllMessages = createAsyncThunk(
  "chat/getAllMessages",
  async (id, thunkAPI) => {
    try {
      return await chatService.getAllMessages(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedChat = action.payload.data;
      })
      .addCase(getAllChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.selectedChat = null;
      })
      .addCase(getAllChat.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chat = action.payload.data;
      })
      .addCase(getAllMessages.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        console.log(action.payload.data, "  payload");
        state.isLoading = false;
        state.messages = action.payload.data;
      });
  },
});

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;
