import { Form, Input, Button, Result } from "antd"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import { signin, SigninPayload } from "../../store/actions/auth.action"
import { Jwt } from "../../store/model.js/auth"
import { AuthState } from "../../store/reducers/auth.reducer"
import { AppState } from "../../store/reducers/index"
import { isAuth } from "../helpers/auth"
import Layout from "./Layout"


const Signin = () => {
    const dispatch = useDispatch()
    const onFinish = (value: SigninPayload) => {
        console.log(signin(value))
        dispatch(signin(value))
    }

    const auth = useSelector<AppState, AuthState>(state => state.auth)

    const showError = () => {
        if (auth.signin.loaded && !auth.signin.success) {
            return (
                <Result
                    status="warning"
                    title="Login failed"
                    subTitle={auth.signin.message}
                />
            )
        }
    }

    const redirectToDashboard = () => {
        const auth = isAuth()
        if (auth) {
            const { user: { role } } = auth as Jwt

            if (role === 0) {
                return <Redirect to="/user/dashboard" />
            } else {
                return <Redirect to="/admin/dashboard" />
            }
        }
    }

    const signinForm = () => (
        <Form labelCol={{ span: 2 }} onFinish={onFinish}>
            <Form.Item name='email' label='email'>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='password'>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType="submit">
                    Signin
                </Button>
            </Form.Item>
        </Form>
    )

    return (
        <Layout title="Sign in" subTitle="Welcome">
            {showError()}
            {redirectToDashboard()}
            {signinForm()}
        </Layout>
    )
}

export default Signin