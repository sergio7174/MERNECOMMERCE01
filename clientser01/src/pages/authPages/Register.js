import React from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Button, Form, Input, message } from 'antd';
import '../../styles/authStyles/register.css'
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";

const Register = () => {

    const navigate = useNavigate();

    const onFinish = async (values) => {

        console.log(values);
        
        

        try{
            // register action with axios action POST to server --> to local const res
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {...values});
            // if action register is success , show success message and navigate to /login 
            if(res.data.success){
                message.success(res.data.message);
                navigate('/login')
            }else{
                message.error(res.data.message);
            }
        }catch(error){
            console.log(error);
            message.error("Something went wrong")
        }
    };

    return (
      
        
        <Layout title={"Ecommerce - Register Form"}>
           
         
            <section className="registerSection" >
                 
                 <div className='container-fluid  d-flex justify-content-center positionForm'>
                <Form className='OuterRegisterFormContainer' onFinish={onFinish} >
                    <Form.Item label="Username" name="name" rules={[{ required: true, message: 'Please input your username!', },]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="email" label="E-mail" rules={[{ type: 'email', message: 'The input is not valid E-mail!', }, { required: true, message: 'Please input your E-mail!', },]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!', },]}>
                        <Input.Password className='pswd' />
                    </Form.Item>

                    <Form.Item label="Contact" name="contact" rules={[{ required: true, message: 'Please input your contact number!', },]}>
                        <Input />
                    </Form.Item>

                    {/* <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address!', },]}>
                        <Input />
                    </Form.Item> */}

                    <Form.Item name="answer" label="Your Favourite sport" rules={[{ required: true, message: 'Please input your favourite sport!', },]}>
                        <Input />
                    </Form.Item>

                    <Form.Item className='submitBtnFormItem'>
                        <section className="submitBtnSection">
                        <Button className='submitBtn' type="primary" htmlType="submit"> Submit</Button>
                        <Link to="/login">Already a user | Sign-In</Link>
                        </section>
                    </Form.Item>
                </Form>
                </div>
            </section>
        </Layout>
       
       
    )
}

export default Register