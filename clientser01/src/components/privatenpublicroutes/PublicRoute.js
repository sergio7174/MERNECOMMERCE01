import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
           // if there is a token in localstore, an user logged In  
           if(localStorage.getItem("token")){// navigate to home
                                              return <Navigate to='/' />}
           // else return route                                   
           else{ return children }}

export default PublicRoute