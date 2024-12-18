import {configureStore } from "@reduxjs/toolkit" 
import Dataslice from "./slices/Dataslice"
import Userslice from "./slices/Userslice"
import Serchslice from "./slices/Serchaslice"
import Wishlistslice from "./slices/Wishlistslice"


const Store=configureStore({
    reducer:{
        listing:Dataslice,
        User:Userslice,
        Serch:Serchslice,
        wishlist:Wishlistslice,
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default Store