import React, {useState} from 'react'
import Layout from '../../components/Layout'
import Usermenu from '../../components/Usermenu'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/features/authSlice';

const Profile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // get from redux-store state.user to local const user
  const {user} = useSelector((state) => state.user);

  const [componentDisabled, setComponentDisabled] = useState(true);

  const onFinish = async (values) => {
    console.log(values);
    try {
      // profile action with axios action PUT to server --> to local const res  
      const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, { ...values }, {
        // get token from localStore to allows send and receive data
        headers : { Authorization : `Bearer ${localStorage.getItem("token")}`} });
      // if action is success  
      if (res.data?.success) {
        // update updatedUser value through the dispacth state to redux-store 
        dispatch(setUser(res.data.updatedUser));
        // const ls = localStorage.getItem("token");
        // ls = JSON.parse(ls);
        // ls.user = res.data.updatedUser;
        // localStorage.setItem("token", JSON.stringify(ls));
        message.success(res.data.message);
        // navigate('/login')
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong")
    }
  };

  return (
    <Layout title={'Dashboard - Profile'}>
      <div className='container-fluid m-3 p-3'>
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <div>
              <Form initialValues={{...user}} className='OuterRegisterFormContainer' onFinish={onFinish} >
                <Form.Item label="Username" name="name" rules={[{ required: true, message: 'Please input your username!', },]}>
                  <Input />
                </Form.Item>

                <Form.Item  name="email" label="E-mail" rules={[{ type: 'email', message: 'The input is not valid E-mail!', }, { required: true, message: 'Please input your E-mail!', },]} >
                  <Input disabled={componentDisabled}  />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!', },]}>
                  <Input.Password disabled={componentDisabled} className='pswd' />
                </Form.Item>

                <Form.Item label="Contact" name="contact" rules={[{ required: true, message: 'Please input your contact number!', },]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address!', },]}>
                  <Input />
                </Form.Item>

                <Form.Item name="answer" label="Your Favourite sport" rules={[{ required: true, message: 'Please input your favourite sport!', },]}>
                  <Input />
                </Form.Item>

                <Form.Item className='submitBtnFormItem'>
                  <section className="submitBtnSection">
                    <Button className='submitBtn' type="primary" htmlType="submit"> Update</Button>
                  </section>
                </Form.Item>

              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
