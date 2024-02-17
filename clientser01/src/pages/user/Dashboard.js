import React from 'react'
import Layout from '../../components/Layout'
import Usermenu from '../../components/Usermenu'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const {user} = useSelector((state) => state.user);
    
  return (
    <Layout title={"E-commerce Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <Usermenu />
            </div>
            <div className="col-md-9">
                <div className="card w-75 p-3">
                    <h6>Your name : {user?.name}</h6>
                    <h6>Your Email : {user?.email}</h6>
                    <h6>Your Contact : {user?.contact}</h6>
                    <h6>Your address : {user?.address}</h6>
                    <h6>Your Favourite Sport : {user?.answer}</h6>
                    <h6>Created at : {user?.createdAt}</h6>
                    <h6>Updated at : {user?.updatedAt}</h6>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
