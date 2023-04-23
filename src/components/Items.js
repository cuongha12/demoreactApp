import React, { useEffect } from 'react'
import { Button, Card, Col, Pagination, Row, Select, Space } from 'antd';
import { useState } from 'react';
import Meta from 'antd/es/card/Meta';
import axios from 'axios';
const Items = () => {
    const [category, setCategory] = useState([])
    const [attributes, setAttributes] = useState([])
    const [checkCategory, setCheckCategory] = useState('')
    const [checkAttributes, setCheckAttributes] = useState('')
    const [product, setProduct] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(4)
    const [price, setPrice] = useState('')
    const getCategory = async () => {
        return await axios.get('https://demo-uaba.onrender.com/category')
            .then((res) => setCategory(res.data))
    }
    const getAttributes = async () => {
        return await axios.get('https://demo-uaba.onrender.com/attributes')
            .then((res) => setAttributes(res.data))
    }
    const getProduct = async () => {
        return await axios
            .get(`https://demo-uaba.onrender.com/product?category=${checkCategory}&attributes=${checkAttributes}&page=${page}&limit=${limit}&price=${price}`)
            .then((res) => setProduct(res.data))
    }
    const loadData = async () => {
        await getCategory()
        await getAttributes()
        await getProduct()
    }
    const handleChange = (type, value) => {
        if (type === 'category') {
            setCheckCategory(value)
        } else if (type === 'attributes') {
            console.log(value);
            if (value === "áo nỉ") {
                setCheckAttributes('aoni')
            }
            if (value === "áo thun") {
                setCheckAttributes('aothun')
            }
            if (value === "quần dài") {
                setCheckAttributes('quandai')
            }
            if (value === "quần short") {
                setCheckAttributes('quansort')
            }

        } else {
            setPrice(value)
        }
    };
    useEffect(() => {
        loadData()
    }, [page, limit, price, checkAttributes, checkCategory])

    return (
        <>
            <Space wrap style={{
                marginBottom: 50
            }}>
                <Row gutter={[32, 24]}>
                    <Col lg={6} sm={12} xs={12} md={6}>
                        <Select
                            style={{
                                width: 120,
                            }}
                            value={checkCategory}
                            onChange={(value) => handleChange('category', value)}
                            options={category?.map((e) => {
                                return {
                                    value: e.name,
                                    label: e.name
                                }
                            })}
                        />
                    </Col>
                    <Col lg={6} sm={12} xs={12} md={6}>
                        <Select
                            value={checkAttributes}
                            style={{
                                width: 120,
                            }}
                            onChange={(value) => handleChange('attributes', value)}
                            options={attributes?.map((e) => {
                                return {
                                    value: e.name,
                                    label: e.name
                                }
                            })}
                        />
                    </Col>
                    <Col lg={6} sm={12} xs={12} md={6}>
                        <Select
                            value={price}
                            style={{
                                width: 120,
                            }}
                            onChange={(value) => handleChange('price', value)}
                            options={[
                                {
                                    value: 'asc',
                                    label: 'Giá tăng dần',
                                },
                                {
                                    value: 'desc',
                                    label: 'Giá giảm giần',
                                },
                            ]}
                        />
                    </Col>
                    <Col lg={6} sm={12} xs={12} md={6}>
                        <Button type='primary' onClick={() => {
                            setCheckAttributes('')
                            setCheckCategory('')
                            setPrice('')
                        }}>Xoá bộ lọc</Button>
                    </Col>
                </Row>
            </Space>
            <Row gutter={[16, 24]} style={{
                marginBottom: 50
            }}>
                {
                    product?.data?.map((e) => (
                        <Col key={e._id} lg={6} md={6} sm={12} xs={12}>
                            <Card
                                hoverable
                                style={{
                                    width: 100,
                                }}
                                cover={<img alt="example" src={e.image} />}
                            >
                                <Meta title={e.name} description={e.price} />
                            </Card>

                        </Col>
                    ))
                }
            </Row>
            <Pagination current={page} onChange={(size) => {
                setPage(size);
            }} total={product?.total * 10} />
        </>

    );
}

export default Items