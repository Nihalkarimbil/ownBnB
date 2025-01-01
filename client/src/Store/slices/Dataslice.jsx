import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../../axiosinstance";

const initialState = {
    data: [],
    listings:[],
    status: "none",
    Users:[],
    Hosts:[]
};

const Dataslice = createSlice({
    name: "listing",
    initialState,
    reducers: {},
    extraReducers: (Builder) => {
        Builder.addCase(getlistings.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = "none";
        })
        .addCase(getlistings.pending, (state) => {
            state.status = "Loading";
        })
        .addCase(getlistings.rejected, (state) => {
            state.status = "Error";
        })
        .addCase(getAdminlist.fulfilled,(state,action)=>{
            state.listings=action.payload
            state.status=null
        })
        .addCase(getAdminlist.pending,(state)=>{
            state.status="Loading"
        })
        .addCase(getAdminlist.rejected,(state)=>{
            state.status="Error"
        })
        .addCase(userfetch.fulfilled,(state,action)=>{
            state.Users=action.payload
            state.status=null
        })
        .addCase(userfetch.pending,(state)=>{
            state.status="Loading"
        })
        .addCase(userfetch.rejected,(state)=>{
            state.status="Error"
        })
        .addCase(gethosts.fulfilled,(state,action)=>{
            state.Hosts=action.payload
            state.status=null
        })
        .addCase(gethosts.pending,(state)=>{
            state.status="Loading"
        })
        .addCase(gethosts.rejected,(state)=>{
            state.status="Error"
        })
    },
});

export default Dataslice.reducer;

export const getlistings = createAsyncThunk("listings/get", async () => {
    try {
        const response = await axiosinstance.get("/user/allList");
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getAdminlist= createAsyncThunk("/adminlist",async()=>{
    try {
        const res= await axiosinstance.get("/admin/allListings")
        return res.data
    } catch (error) {
        console.log(error);
        
    }
})

export const userfetch= createAsyncThunk("/getusers",async()=>{
    try {
        const response= await axiosinstance.get("/admin//getallusers")
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const gethosts= createAsyncThunk("/gethosts",async()=>{
    try {
        const res= await axiosinstance.get("/admin/getHosts")
        console.log(res.data);
        return res.data
        
    } catch (error) {
        console.log(error);
        
    }
})
