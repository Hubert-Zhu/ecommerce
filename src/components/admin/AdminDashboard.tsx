import { Col, Menu, Row, Typography, Descriptions } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import Layout from "../core/Layout"
import {
    ShoppingCartOutlined,
    UserOutlined,
    OrderedListOutlined
} from "@ant-design/icons"
import DescriptionsItem from "antd/lib/descriptions/Item"
import { Jwt } from "../../store/model.js/auth"
import { isAuth } from "../helpers/auth"

const { Title } = Typography

const AdminDashboard = () => {

    const { user: { name, role, email } } = isAuth() as Jwt

    const adminLinks = () => (
        <>
        <Title level={5}>Admin Link</Title>
        <Menu>
            <Menu.Item>
                <ShoppingCartOutlined />
                <Link to="/create/category">Add Tag</Link>
            </Menu.Item>
            <Menu.Item>
                <UserOutlined />
                <Link to="/create/product">Add Item</Link>
            </Menu.Item>
            <Menu.Item>
                <OrderedListOutlined />
                <Link to="">Ordering List</Link>
            </Menu.Item>
        </Menu>
        </>
    )

    const adminInfo = () => (
        <Descriptions title="Admin Info" bordered>
            <Descriptions.Item label="name">{name}</Descriptions.Item>
            <Descriptions.Item label="email">{email}</Descriptions.Item>
            <Descriptions.Item label="role">Admin</Descriptions.Item>
        </Descriptions>
    )

    return (
        <Layout title="admin dashboard" subTitle="">
            <Row>
                <Col span="4">
                    {adminLinks()}
                </Col>
                <Col span="20">
                    {adminInfo()}
                </Col>
            </Row>
        </Layout>
    )
}

export default AdminDashboard