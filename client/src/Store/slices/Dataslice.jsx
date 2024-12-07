import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../../axiosinstance";

const initialState = {
    data: [],
    status: "none",
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
        });
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
