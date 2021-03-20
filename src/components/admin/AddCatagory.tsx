import { Button, Input, Form, message } from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../config'
import { Jwt } from '../../store/model.js/auth'
import Layout from "../core/Layout"
import { isAuth } from '../helpers/auth'

const AddCategory = () => {
    const [name, setName] = useState<string>("")

    const { user, token } = isAuth() as Jwt

    useEffect(() => {
        async function AddCatagory() {
            try {
                let response = await axios.post<{name: string}>(`${API}/category/create/${user._id}`,
                    {
                        name: name,
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                message.success(`[${response.data.name}] is added successfully`)
            } catch (error) {
                message.error(error.response.data.error)
            }
        }
        if (name) {
            AddCatagory()
        }
        
    }, [name])

    const onFinish = (value: { name: string }) => {
        setName(value.name)
    }

    return (
        <Layout title="Add categoary" subTitle="">
            <Form onFinish={onFinish}>
                <Form.Item name="name" label="Catagory name">
                    <Input />
                </Form.Item>
                <Form.Item name="name">
                    <Button type="primary" htmlType="submit">Add Category</Button>
                </Form.Item>
            </Form>
            <Button>
                <Link to="/admin/dashboard">Back to Dashboard</Link>
            </Button>
        </Layout>
    )
}

export default AddCategory