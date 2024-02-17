import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setTags } from '../redux/features/tagsSlice';

const Tags = () => {
    // Destructuring assignment global state state.tags redux-store  to local destructured {} const tags got from  redux-toolkit 
    const { tags } = useSelector((state) => state.tags);
    const dispatch = useDispatch();

    const getAllTags = async () => {
        try {
            // get all tags with axios action GET from server to local const res
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/tag/get-all-tags`)
            // if action get success
            if (res.data?.success) {
                // message.success(res.data.message);
                dispatch(setTags(res.data.tags)); // change tag value, by changing its state in redux-toolkit store
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in getAllCategory')
        }
    };

    useEffect(() => {
        // fuction call getAllTags()
        getAllTags();
        // eslint-disable-next-line
    }, []);

    return (
        <Layout title={"All Categories"}>
            <div className="categoriesOuterContainer">
                <div className="categoriesDiv">
                    <h5 className='categoriesAllCategories'>All Tags</h5>
                    {/* if exits tags* -show all of them */} 
                    {tags?.map((tag) => (
                        <div key={tag._id} className="categoriesParticularDivCon">
                            {/* col-md-6 mt-5 mb-3 gx-3 gy-3 */}
                            <Link to={`/tag/${tag.slug}`} className='btn btn-primary'>{tag.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Tags
