import React from 'react'
import Layout from '../../components/Layout'
import { Button, Form, Input, message } from 'antd';
import axios from 'axios'
import '../../styles/authStyles/register.css'
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const navigate = useNavigate();

    // eslint-disable-next-line
    const onFinish = async (values) => {
        console.log(values);
        try{
            // forgot password action with axios action POST to server --> to local const res
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {...values});
            // if action is successfull - show success message - navigate to /login
            if(res.data.success){
                message.success(res.data.message);
                navigate('/login');
            }else{
                message.error(res.data.message);
            }
        }catch(error){
            console.log(error);
            message.error('Something went wrong')
        }
    };

    return (
        <Layout title={"Ecommerce - Forgot Password Form"}>
            <section className="registerSection">
                <Form className='OuterRegisterFormContainer' onFinish={onFinish} >

                    <Form.Item name="email" label="E-mail" rules={[{ type: 'email', message: 'The input is not valid E-mail!', }, { required: true, message: 'Please input your E-mail!', },]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="answer" label="Your Favourite sport" rules={[{ required: true, message: 'Please input your favourite sport!', },]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="New Password" name="password" rules={[{ required: true, message: 'Please input your password!', },]}>
                        <Input.Password className='pswd' />
                    </Form.Item>

                    <Form.Item className='submitBtnFormItem'>
                        <section className="submitBtnSection">
                            <Button className='submitBtn' type="primary" htmlType="submit"> Submit</Button>
                            <Link to="/register">Not a user | Sign-Up</Link>
                        </section>
                    </Form.Item>
                </Form>
            </section>
        </Layout>
    )
}

export default ForgotPassword