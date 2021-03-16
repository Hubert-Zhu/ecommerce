import { Form, Input, Button, Result } from "antd"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { signup, SignupPayload, resetSignup } from "../../store/actions/auth.action";
import Layout from "./Layout"
import { AppState } from "../../store/reducers/index"
import { AuthState } from "../../store/reducers/auth.reducer"

const Signup = () => {
    const dispatch = useDispatch()
    const auth = useSelector<AppState, AuthState>(state => state.auth)

    const [form] = Form.useForm()

    const onFinish = (value: SignupPayload) => {
        dispatch(signup(value))
    }

    useEffect(() => {
        if (auth.signup.loaded && auth.signup.success) {
            form.resetFields()
        }
    }, [auth])

    const showSucess = () => {
        if (auth.signup.loaded && auth.signup.success) {
            return <Result
                status="success"
                title="Successfully signed up"
                extra={[<Button type="primary"><Link to="/signin">Sign in</Link></Button>]}
            />
        }
    }

    const showError = () => {
        if (auth.signup.loaded && !auth.signup.success) {
            return (
                <Result
                    status="warning"
                    title="Registration Error"
                    subTitle={auth.signup.message}
                />
            )
        }
    }

    useEffect(() => {
        return () => {
            dispatch(resetSignup())
        }
    }, [])


    const signupForm = () => (
        <Form form={form} labelCol={{ span: 2 }} onFinish={onFinish}>
            <Form.Item name='name' label='name'>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='password'>
                <Input.Password />
            </Form.Item>
            <Form.Item name='email' label='email'>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    )

    return (
        <Layout title="Sign up" subTitle="">
            {showSucess()}
            {showError()}
            {signupForm()}
        </Layout>
    )
}

export default Signup