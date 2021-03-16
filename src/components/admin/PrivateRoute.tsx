import React, { FC } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { isAuth } from "../helpers/auth"

interface PrivateRouterProps extends RouteProps {
    component: React.ComponentType<any>
}

const PrivateRoute: FC<PrivateRouterProps> = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route 
            {...rest}   
            render={props => {
                const auth = isAuth()
                if(auth) {
                    return <Component {...props} />
                }
                return <Redirect to="/signin" />
            }} 
        />
    )
}

export default PrivateRoute