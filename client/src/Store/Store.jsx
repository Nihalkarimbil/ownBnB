import {configureStore } from "@reduxjs/toolkit" 
import Dataslice from "./slices/Dataslice"


const Store=configureStore({
    reducer:{
        listing:Dataslice
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default Store