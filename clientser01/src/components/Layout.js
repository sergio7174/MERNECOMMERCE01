import React, { useEffect } from 'react'
import Footer from './Footer'
import {useSelector, useDispatch} from 'react-redux';

import Header from './Header'


/**
 * Leveraging Helmet for metadata inclusion can significantly simplify the process of making a React app SEO and social media friendly.
 * 
 * Helmet lets us insert metadata into the <head> tag in much the same way we would using standard HTML syntax. */
import {Helmet} from 'react-helmet';
/***Enterprise-class UI designed for web applications. A set of high-quality React components out of the box */
import { message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/features/authSlice';

const Layout = ({ children, title, description, keywords, author }) => {

  const navigate = useNavigate();
  // get state.user from redux-store through useSelector((state) hook -- to local const user
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch(); // dispatch instance of useDispatch() to set new state to the 
                                  // redux-store
  // getUser Function 
  const getUser = async () => {
    try{
      // get user from backend through axios Action POST --> to local const res
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/getUserData`, {}, {
        
        headers : {Authorization : `Bearer ${localStorage.getItem("token")}`}});
      // if get data success
      if(res.data.success){
        // message.success(res.data.message);
        navigate('/');
        // set new state user.state trought dispatch(setUser(res.data.user)) --> to redux-store
        dispatch(setUser(res.data.user));}

    }catch(error){
      console.log(error);
      message.error("Something went wrong")}};

  useEffect(() => {
    /**if there is not user */
    if(!user){ getUser(); } // call function getUser();
  }// eslint-disable-next-line
  ,[user]);// render when user change

  // console.log(user);

  return (
    <div style={{background:"linear-gradient(to right top,#9f9696,#545bc9"}}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author}></meta>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '78vh' }} >
      <div className=''>
           <br className=''/>
           <br className=''/>
           <br className=''/>
           <h2 className='text-center' >{title}:</h2></div>
        <h4>{children}</h4>
        
        {/* {console.log(user)} */}
      </main>
      <Footer />
    </div>
  )
}

export default Layout;