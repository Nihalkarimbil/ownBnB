import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAdminlist } from '../../Store/slices/Dataslice'

function Listings() {
  const {Adminlist}= useSelector((state)=>state.listing)
  const dispatch= useDispatch()

  useEffect(()=>{
    dispatch(getAdminlist())
  },[])
  return (
    <div>
      
    </div>
  )
}

export default Listings
