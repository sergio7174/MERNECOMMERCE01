import React from 'react'
import Layout from '../../components/Layout'
import Adminmenu from '../../components/Adminmenu'
import { useSelector } from 'react-redux'
import '../../styles/admindashStyles/adminDashboard.css'

const AdminDashboard = () => {
    // get state.user from redux-store through useSelector((state)) hook to local const user
    const {user} = useSelector((state) => state.user);

  return (
    <Layout>
      <div className="AdminDashboard">
      {/* container-fluid m-3 p-3 */}
        <div className="row adminDashCon">
            <div className="sideAdminDashboard col-md-3">
                <Adminmenu />
            </div>
            <div className="col-md-9">
                <div className="mainAdminDashboard card mt-3">
                  <h4>Admin Details</h4>
                    <h6>Admin name : {user?.name}</h6>
                    <h6>Admin Email : {user?.email}</h6>
                    <h6>Admin Contact : {user?.contact}</h6>
                    <h6>Admin address : {user?.address}</h6>
                    <h6>Admin's Favourite Sport : {user?.answer}</h6>
                    <h6>Created at : {user?.createdAt}</h6>
                    <h6>Updated at : {user?.updatedAt}</h6>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
