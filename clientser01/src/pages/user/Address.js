import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Usermenu from '../user/Address'
import axios from 'axios';
import {
    Button, Form, Input, message, Radio,
    Select
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/features/authSlice';
import { setAddresses } from '../../redux/features/addressSlice';
import { AiFillDelete } from 'react-icons/ai'
import '../../styles/address.css';

const Address = () => {
    const { addresses } = useSelector((state) => state.addresses);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [radio, setRadio] = useState("");
    // const [showForm, setShowForm] = useState(false);

    //createAddress onFinish
    const onFinish = async (values) => {
        console.log({ ...values, addressType: radio });
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/address/create-address`, { ...values, addressType: radio }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (res.data?.success) {
                message.success(res.data.message);
                // getAllAddress();
                window.location.reload();
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong")
        }
    };

    //getAllAddress
    const getAllAddress = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/address/get-all-addresses`);
            if (res.data?.success) {
                //   message.success(res.data.message);
                dispatch(setAddresses(res.data?.addresses))
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAllAddress()
    }, [addresses]);

    // deleteAddress container on basis of id
    const deleteAddressDivFunc = async (id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/address/delete-address/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (res.data?.success) {
                message.success(res.data.message);
                getAllAddress();
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong')
        }
    }

    return (
        <Layout title={'Dashboard - User Address'}>
            <div className='container-fluid m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <Usermenu />
                    </div>
                    <div className="col-md-9">
                        <div>
                            <Form className='OuterRegisterFormContainer' onFinish={onFinish} >

                                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!', },]}>
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Contact" name="contact" rules={[{ required: true, message: 'Please input your 10 digit contact number!', },]}>
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Address (Area and Street)" name="address" rules={[{ required: true, message: 'Please input your 10 digit contact number!', },]}>
                                    <Input />
                                </Form.Item>

                                <Form.Item label="City / District / Town" name="city" rules={[{ required: true, message: 'Please input your 10 digit contact number!', },]}>
                                    <Input />
                                </Form.Item>

                                <Form.Item label="State" name="state" rules={[{ required: true, message: 'Please input your 10 digit contact number!', },]}>
                                    <Input />
                                </Form.Item>



                                {/* <Form.Item label="Landmark (optional)" name="address" rules={[{ required: true, message: 'Please input your 10 digit contact number!', },]}>
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Alternate Phone(optional)" name="address" rules={[{ required: true, message: 'Please input your 10 digit contact number!', },]}>
                                    <Input />
                                </Form.Item> */}

                                <Form.Item name='addressType' label="Address Type">
                                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                        <Radio value="Home"> Home </Radio>
                                        <Radio value="Work"> Work </Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item className='submitBtnFormItem'>
                                    <section className="submitBtnSection">
                                        <Button className='submitBtn' type="primary" htmlType="submit">Save</Button>
                                    </section>
                                </Form.Item>

                            </Form>
                        </div>


                        {/* Address Container */}
                        <div className="outerMostAddressDisplayContainer">
                            {addresses.length > 0 && <div className="addressDisplayContainer">
                                {addresses?.map((address) => {
                                    return <div className='addressSingleDiv' key={address._id}>
                                        <div className="addTypeAndDeleteIconDiv">
                                            <p className="addType">Address Type : {address.addressType}</p>

                                            <AiFillDelete className='deleteIcon' onClick={() => { deleteAddressDivFunc(address._id) }} />
                                        </div>
                                        <p className="addName">Name : {address.name}</p>
                                        <p className="addContact">Contact No. : {address.contact}</p>
                                        <p className="addAddress">Address (Area or Street) : {address.address}</p>
                                        <p className="addCity">City : {address.city}</p>
                                        <p className="addState">State : {address.state}</p>
                                        <hr />
                                        <hr />
                                    </div>

                                })}
                            </div>}
                        </div>

                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Address
