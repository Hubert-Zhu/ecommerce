import Layout from '../core/Layout'
import React, { useEffect } from 'react'
import { Button, Form, Input, Select, Upload } from 'antd'
import { UploadOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/actions/category.action'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
const AddProduct = () => {
    const dispatch = useDispatch()

    const category = useSelector<AppState, CategoryState>(state => state.category)
    
    useEffect(() => {
        dispatch(getCategory())
    },[])

    return (
        <div>
            <Layout title="Add Product" subTitle="">
                <Form initialValues={{category: ""}}>
                    <Form.Item>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload the cover of product</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="name" label="Product name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Product description">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Product description">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Product Category">
                        <Select>
                            <Select.Option value="">Please choose a option</Select.Option>
                            {
                                category.category.result.map(item => (
                                    <Select.Option value={item._id}>{item.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="quantity" label="Product numbe">
                        <Input />
                    </Form.Item>
                    <Form.Item name="shipping" label="Need shipping">
                        <Select>
                            <Select.Option value="1">Yes</Select.Option>
                            <Select.Option value="0">NO</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Add Product</Button>
                    </Form.Item>
                </Form>
            </Layout>
        </div>
    )
}

export default AddProduct
