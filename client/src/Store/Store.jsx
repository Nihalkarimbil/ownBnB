import {configureStore } from "@reduxjs/toolkit" 
import Dataslice from "./slices/Dataslice"
import Userslice from "./slices/Userslice"


const Store=configureStore({
    reducer:{
        listing:Dataslice,
        User:Userslice
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default Store