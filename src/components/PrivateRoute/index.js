import React from 'react'
import { Redirect, Route, } from 'react-router-dom'


export function PrivateRoute ({children, machine, ...rest}) {
    const {user} = machine.context
    return (
        <Route {...rest} render={({ location }) =>
            user !== undefined ? (children) : (<Redirect to={{ pathname: '/login', state: { from: 'location' } }} />)} />
    )
}


export default PrivateRoute