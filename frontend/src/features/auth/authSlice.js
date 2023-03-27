import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import axios from "axios";


const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}

const API_URL = '/api/users/'

export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try{
        const response = await axios.post(API_URL, user)
        if(response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }　
      return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try{
        const response = await axios.post(API_URL + 'login', user)
        if(response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async()=>{
    localStorage.removeItem('user')
})


const authSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.user = null
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = null
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
        })
        .addCase(register.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(logout.pending, (state) => {
            state.isLoading = true
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.isLoading = false
        })
        .addCase(logout.rejected, (state) => {
            state.isLoading = false

        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state,action) => {
            state.user = action.payload
            state.isLoading = false
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
        })

        }
    });


export const {reset} = authSlice.actions
export default authSlice.reducer

