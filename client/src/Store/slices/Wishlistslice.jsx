import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axiosinstance from "../../axiosinstance"

export const addtowishlist= createAsyncThunk("/user/addtowish",async(wishitem)=>{
    try {
        const respons= await axiosinstance.post("/user/addwish",wishitem)
        console.log("aaaaaa",respons);
        
        return respons.data
    } catch (error) {
        console.log(error);
        
    }
})

export const allwish= createAsyncThunk("/allwish",async()=> {
    try {
        const resp= await axiosinstance.get("/userwish")
        return resp.data
    } catch (error) {
        console.log(error);
        
    }
})

const Wishlistslice= createSlice({
    name:"wishlist",
    initialState:{
        wishlist:[],
        status:"none"
    },
    reducers:{
        
    },
    extraReducers:(Builder)=>{
        Builder
        .addCase(addtowishlist.pending,(state)=>{
            state.status="Loading"
        })
        .addCase(addtowishlist.fulfilled,(state,action)=>{
            state.status="success"
            state.wishlist= action.payload.wishlist
        })
        .addCase(addtowishlist.rejected,(state)=>{
            state.status="failed"
        })
        .addCase(allwish.pending,(state)=>{
            state.status="Loading"
        })
        .addCase(allwish.fulfilled,(state,action)=>{
            state.status="succes"
            state.wishlist=action.payload
        })
    }
})

export default Wishlistslice.reducer
