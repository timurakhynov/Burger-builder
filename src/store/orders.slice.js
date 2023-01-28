import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBurger } from "../api/apiBurger";

const namespace = 'orderce';

export const getOrderce = createAsyncThunk(
    `${namespace}/getOrders`,
    async () => {
        return await apiBurger.getOrders()
    }
)

export const ordersSlice = createSlice({
    name: namespace,
    initialState: {
        orders: [],
        loading: false
    },
    extraReducers: builder => {
        builder
        .addCase(getOrderce.pending, (state) => {
            state.loading = true
        })
        .addCase(getOrderce.rejected, (state) => {
            state.loading = false
        })
        .addCase(getOrderce.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
        })
    }
})