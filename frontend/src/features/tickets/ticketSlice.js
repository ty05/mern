import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../utils";

const API_URL = '/api/ticket/'

const initialState = {
    ticket: {},
    tickets: [],
    isLoading: false,
    message: null,
}

export const getTickets = createAsyncThunk('ticket/get', async(_, thunkAPI) => {
    try{
        const token = await thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(API_URL, config)
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const createTicket = createAsyncThunk('ticket/create', async(ticketData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers : {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(API_URL + 'create', ticketData, config)
        return response.data;

    } catch(error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const getTicket = createAsyncThunk('ticket/id', async(id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get(API_URL + id, config)
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const closeTicket = createAsyncThunk('ticket/close', async(id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put(API_URL + id, {status: 'closed'}, config)
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

const ticketSlice = createSlice({
    name:'ticket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
         .addCase(createTicket.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createTicket.fulfilled, (state, action)=> {
            state.isLoading = false
            state.ticket = action.payload
         })
         .addCase(createTicket.rejected, (state, action)=>{
            state.isLoading=false 
            state.message = action.payload
         })
         .addCase(getTickets.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getTickets.fulfilled, (state,action)=>{
            state.isLoading=false
            state.tickets = action.payload
         })
         .addCase(getTickets.rejected, (state,action)=>{
            state.isLoading = false
            state.message = action.payload
         })
         .addCase(getTicket.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getTicket.fulfilled, (state,action)=>{
            state.isLoading=false
            state.ticket = action.payload
         })
         .addCase(getTicket.rejected, (state,action)=>{
            state.isLoading = false
            state.message = action.payload
         })
         .addCase(closeTicket.pending, (state) => {
            state.isLoading = true
         })
         .addCase(closeTicket.fulfilled, (state,action)=>{
            state.isLoading=false
            state.ticket = {}
         })
         .addCase(closeTicket.rejected, (state,action)=>{
            state.isLoading = false
            state.message = action.payload
         })
         
    }
})


export default ticketSlice.reducer