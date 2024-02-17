import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  // if there is a token return childrem route, else go to login 
  if(localStorage.getItem("token"))
          {return children}
                           else{ return <Navigate to='/login' />}}

export default ProtectedRoute