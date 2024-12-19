import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { allwish } from '../../Store/slices/Wishlistslice'



function Wishlist() {
    const dispatch = useDispatch()
    const { wishlist } = useSelector((state) => state.wishlist)

    useEffect(() => {
        dispatch(allwish())
    }, [dispatch])


    console.log(wishlist);
    return (

        <div>
            
        </div>
    )
}

export default Wishlist
