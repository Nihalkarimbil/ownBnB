import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../../axiosinstance";


export const registeruser = createAsyncThunk("/user/register", async (userdata) => {
    try {
        const respons = await axiosinstance.post("user/signup", userdata)
        return respons.data
    } catch (error) {
        throw new error
    }
})

export const userlogin = createAsyncThunk("/user/login",async(userData)=>{
    try {
        const res= await axiosinstance.post("/user/signin",userData)
        return res.data
    } catch (error) {
        throw new error
    }
})
const activeUser = JSON.parse(localStorage.getItem('activeUser')) || null
console.log(activeUser);



const Userslice = createSlice({
    name: "user",
    initialState: {
        user: activeUser,
        loading: false,
        token: localStorage.getItem('userToken') || null
    },
    
    reducers: {
        logOut:(state)=>{
            state.user=null,
            state.token=null,
            localStorage.removeItem("activeUser")
            localStorage.removeItem("userToken")
        }
    },
    extraReducers: (Builder) => {
        Builder
            .addCase(registeruser.pending, (state) => {
                state.user = null,
                state.loading = true
            })
            .addCase(registeruser.fulfilled, (state, action) => {
                state.loading = false,
                state.user = action.payload.data
                state.token = action.payload.token;
                localStorage.setItem('activeUser', JSON.stringify(action.payload.data));
                localStorage.setItem('userToken', action.payload.token);
            })
            .addCase(registeruser.rejected,(state)=>{
                state.loading=false
            })
            .addCase(userlogin.pending,(state)=>{
                state.user = null,
                state.loading = true
            })
            .addCase(userlogin.fulfilled,(state,action)=>{
                state.loading=false,
                state.user=action.payload.data
                state.token=action.payload.token
                localStorage.setItem('activeUser', JSON.stringify(action.payload.user));
                localStorage.setItem('userToken', action.payload.token);
            })
            .addCase(userlogin.rejected,(state)=>{
                state.user=null,
                state.loading=true
            }
        )
            
    }       
})


export const {logOut}= Userslice.actions
export default Userslice.reducer