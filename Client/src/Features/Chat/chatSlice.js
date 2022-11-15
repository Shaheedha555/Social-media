import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  selectedChat: null,
  chat: [],
  message: "",
  isMessageLoading: false,
  isChatLoading: false,
  notification: [],
};
export const searchUser = createAsyncThunk(
  "/searchUser",
  async (keyword, thunkAPI) => {
    try {
      const response = await chatService.searchUser(keyword);
      return response.data;
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
export const sendMessage = createAsyncThunk(
  "message/send",
  async (data, thunkAPI) => {
    try {
      return await chatService.sendMessage(data);
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
export const createGroupChat = createAsyncThunk(
  "chat/group",
  async (data, thunkAPI) => {
    try {
      return await chatService.createGroupChat(data);
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
export const renameGroup = createAsyncThunk(
  "chat/group/rename",
  async (data, thunkAPI) => {
    try {
      return await chatService.renameGroup(data);
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
export const addToGroup = createAsyncThunk(
  "chat/group/add",
  async (data, thunkAPI) => {
    try {
      return await chatService.addToGroup(data);
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
export const removeFromGroup = createAsyncThunk(
  "chat/group/remove",
  async (data, thunkAPI) => {
    try {
      return await chatService.removeFromGroup(data);
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
      state.selectedChat = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    selectedChat: (state, action) => {
      state.selectedChat = action.payload.data;
    },
    createAlert: (state, action) => {
      state.notification.push({
        time: Date.now(),
        message: action.payload.message,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChat.pending, (state) => {
        state.isChatLoading = true;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.isChatLoading = false;
        state.isSuccess = true;
        state.selectedChat = action.payload.data;
      })
      .addCase(getChat.rejected, (state, action) => {
        state.isChatLoading = false;
        state.isError = true;
        state.message = action.payload.data.message;
      })
      .addCase(getAllChat.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chat = action.payload.data;
      })
      .addCase(getAllChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllMessages.pending, (state, action) => {
        state.isMessageLoading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.isMessageLoading = false;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.isMessageLoading = false;
      })
      .addCase(createGroupChat.pending, (state) => {
        state.isChatLoading = true;
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.isChatLoading = false;
        state.isSuccess = true;
        state.selectedChat = action.payload.data;
      })
      .addCase(createGroupChat.rejected, (state, action) => {
        state.isChatLoading = false;
        state.isError = true;
        state.message = action.payload.data.message;
      });
  },
});

export const { reset, createAlert } = chatSlice.actions;
export default chatSlice.reducer;
