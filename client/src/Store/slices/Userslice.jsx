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

export const userlogin = createAsyncThunk("/user/login", async (userData, { rejectWithValue }) => {
    try {
        const res = await axiosinstance.post("/user/signin", userData);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return rejectWithValue("User not found");
        } else {
            return rejectWithValue("Login failed. Please try again.");
        }
    }
});


const activeUser = JSON.parse(localStorage.getItem('activeUser'))
console.log(activeUser);



const Userslice = createSlice({
    name: "user",
    initialState: {
        user: activeUser,
        loading: false,
        token: localStorage.getItem('userToken') || null,
        error: ""
    },

    reducers: {
        logOut: (state) => {
            state.user = null,
            state.token = null,
            localStorage.removeItem("activeUser")
            localStorage.removeItem("userToken")
        }, updateUser(state, action) {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem("activeUser", JSON.stringify(state.user));
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
            .addCase(registeruser.rejected, (state) => {
                state.loading = false
            })
            .addCase(userlogin.pending, (state) => {
                state.user = null

            })
            .addCase(userlogin.fulfilled, (state, action) => {
                state.loading = false,
                state.user = action.payload.data
                state.token = action.payload.token
                state.user.admin = action.payload.data.admin;
                localStorage.setItem('activeUser', JSON.stringify(action.payload.data));
                localStorage.setItem('userToken', action.payload.token);
            })
            .addCase(userlogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            })       
            
        ;
        

    }
})


export const { logOut, updateUser } = Userslice.actions
export default Userslice.reducer