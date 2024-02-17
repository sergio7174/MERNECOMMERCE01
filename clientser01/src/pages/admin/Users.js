import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Adminmenu from '../../components/Adminmenu'
import axios from 'axios'
import { message } from 'antd'

const Users = () => {
    
    const [allUsers, setAllUsers]=useState([]);
    
    const getAllUsers=async()=>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data?.success) {
                // message.success(res.data.message);
                setAllUsers(res.data.users)
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong while fetching all users!')
        }
    }
    useEffect(()=>{
        getAllUsers()
    }, [])
    return (
        <Layout title={'Dashboard - All Users'}>
            <div className='container-fluid m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                        <h2>All Users</h2>
                    </div>
                    <div className="wishListContainer">
                        <div className="wishListInnerContainer">
                            {allUsers.length > 0 ? <>{allUsers?.map((user) => (
                                <div key={user._id} className="CartPageMainInnerContainer row p-3 mb-2 card flex-row">
                                    <div className="wishListPageMainCardContainer col-md-7">
                                        <h4>{user.name}</h4>
                                    </div>
                                </div>
                            ))}</> : <div className='no_product_here'>No users yet!</div>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users
