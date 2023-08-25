import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ( {isAuthenticated,children}) => {



    if(!isAuthenticated){
      return <Navigate to="/login"  />    }
    return children
  return (
    <div>

    </div>
  )
}

export default ProtectedRoute

