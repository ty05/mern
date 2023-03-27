import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const CheckLoggedin = ({children}) => {
  
  const { user } = useSelector((state)=>state.auth)
  

  if(user) {
    return children
  } else {
    
    return <Navigate to = '/login' />
  }
  
}

export default CheckLoggedin