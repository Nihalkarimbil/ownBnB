import React, { useEffect, useState } from 'react'
import axiosinstance from '../../axiosinstance';


function Hostlisting() {
  const [List,setList]= useState([])
  const [loading,setLoading]=useState(true)
  console.log(List);
  
  useEffect(() => {
    const fech = async () => {
        try {
            const respons = await axiosinstance.get("/host/allListing")
            setList(respons.data)
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }
    fech()
}, []);
 
  
  return (
    <div>
      
    </div>
  )
}

export default Hostlisting
