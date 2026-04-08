import { createSlice } from "@reduxjs/toolkit"
import { createOrder, fetchOrders } from "./ordersThunk"

interface OrdersState {
    currentOrder: any | null 
    orders: any[]
    loading: boolean
    error: string | null
}
const initialState: OrdersState = {
    currentOrder:  null ,
    orders: [],
    loading: false,
    error:  null,
}
const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.loading = true
            state.error = null
        } )
        .addCase(createOrder.fulfilled, (state,action) => {
            state.currentOrder = action.payload
            state.loading = false
        } )
        .addCase(createOrder.rejected, (state,action) => {
            state.error = action.payload as string
            state.loading = false
        } )
        .addCase(fetchOrders.pending, (state) => {         
            state.error = null
            state.loading = true
        } )
        .addCase(fetchOrders.fulfilled, (state, action ) => {         
            state.loading = false
            state.orders = action.payload
        } )
        .addCase(fetchOrders.rejected, (state, action ) => {         
            state.loading = false
            state.error = action.payload as string
           
        } )

    }

})

export const {clearCurrentOrder} = ordersSlice.actions
export default ordersSlice.reducer