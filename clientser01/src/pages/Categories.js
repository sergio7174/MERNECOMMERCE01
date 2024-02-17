import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../redux/features/categorySlice';
import { message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
  // get state.categories from redux-toolkit store to a local const categories
  // { var } Destructuring is a convenient way of creating new variables by extracting some values from data stored in objects or arrays
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const getAllCategory = async () => {
    try {
      // get all category action with axios action get TO SERVER --> to local const res
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-category`)
       // get all category action is success 
      if (res.data.success) {
       
        dispatch(setCategories(res.data.category)); // set a new state to categories in redux-store
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong in getAllCategory')
    }
  };

  useEffect(() => {
    // fuction call getAllCategory()
    getAllCategory();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title={"All Categories"}>
      <div className="categoriesOuterContainer">
        <div className="categoriesDiv">
          {/* {cat = Object.keys(categories)}
<li key={cat._id}><Link to={`/category/${cat?.slug}`} className="dropdown-item">{cat.name}</Link></li> */}
          <h5 className='categoriesAllCategories'>All Categories</h5>
          {/** show categories values store in categories array from backend*/}
          {categories?.map((cat) => (
            <div key={cat._id} className="categoriesParticularDivCon">
              {/* col-md-6 mt-5 mb-3 gx-3 gy-3 */}

              <Link to={`/category/${cat.slug}`} className='btn btn-primary'>{cat.name}</Link>
            
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories
