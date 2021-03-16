import React, { FC } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { Jwt } from "../../store/model.js/auth"
import { isAuth } from "../helpers/auth"

interface AdminRouterProps extends RouteProps {
    component: React.ComponentType<any>
}

const AdminRoute: FC<AdminRouterProps> = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route 
            {...rest}   
            render={props => {
                const auth = isAuth()
                if (auth) {
                    const {
                        user: { role }
                    } = auth as Jwt
                    if (role === 1) {
                        return <Component {...props} />
                    }
                }
                return <Redirect to="/signin" />
            }} 
        />
    )
}

export default AdminRoute