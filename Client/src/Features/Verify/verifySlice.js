
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import verifyService from './verifyService'


const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const sendOTP = createAsyncThunk(
  'verify/sendOTP',
  async (data,thunkAPI) => {
    try {
      console.log('otp fn');
      return await verifyService.sendOTP(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const verifyOTP = createAsyncThunk(
  'verify/verifyOTP',
  async (data,thunkAPI) => {
    try {
      return await verifyService.verifyOTP(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      
  },
})

export const { reset } = verifySlice.actions
export default verifySlice.reducer