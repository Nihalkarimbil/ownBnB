import { createSlice } from "@reduxjs/toolkit";


const Serchslice= createSlice({
    name:"Search",
    initialState:{
        City:"",
        Date:"",
        guest:""
    },

    reducers:{
        SearchParams: (state, action) => {
            state.City = action.payload.City;
            state.Date = action.payload.Date;
            state.guest = action.payload.Count;
        }
    }
    
})

export const {SearchParams}= Serchslice.actions
export default Serchslice.reducer