import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { message, Modal } from 'antd';

export const GetAllCategory = async () => {

    const [categories, setCategories] = useState([]);

    try {
      // get all categories from backend using axios action GET, to const res.
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-category`)
      // if got data successfully --> change local category.state with setCategories(res.data.category)
      // new values



      if (res.data.success) { setCategories(res.data.category)}
    } catch (error) {
      console.log(error);
      message.error('Something went wrong in getAllCategory')
    }
  };