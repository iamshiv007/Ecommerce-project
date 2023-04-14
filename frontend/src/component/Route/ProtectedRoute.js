import React, { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const ProtectedRoute = ({ isAdmin, component:Component, ...rest}) => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    const alert = useAlert()
    
  return (
    <Fragment>
        {loading === false && (
            <Route
            {...rest}
            render = {(props) => {
                if(isAuthenticated === false){
                    alert.error("Please Login")
                    return <Redirect to='/login' />
                }

                if(isAdmin === true && user.role !== "Admin"){
                    alert.error('Only admin can access to dashboard !')
                    return <Redirect to='/' />
                }

                return <Component {...props} />
            }}
            />
        )}
    </Fragment>
  )
}
