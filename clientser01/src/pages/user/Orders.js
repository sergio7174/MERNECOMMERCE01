import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Usermenu from '../../components/Usermenu'
import axios from 'axios'
import '../../styles/orders.css'

const Orders = () => {


  const [allOrders, setAllOrders] = useState([])
  
  const getOrders = async () => {
    // Get Orders action with axios action GET to server --> to local const res  
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`, {
       // get from localStorage token to allow send and receive data
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}})
     // if action get success
    if (res.data.success) {
      console.log(res.data)
      setAllOrders([...res.data.allOrders]) // change value of allOrders
    }
  }
  useEffect(() => {
    // function call getOrders();
    getOrders()
  }, []) //[] just only one time


  return (
    <Layout title={'Dashboard - Orders'}>
      <div className='container-fluid m-3 p-3'>
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <h2>Orders</h2>
            <div className="orders_container">
              {console.log(allOrders)}
              {allOrders.map((item) => {
                return <div className="single_order" key={item._id}>
                  
                  <p>Payment method : {item.payment}</p>
                  <div className="order_title">{item.products.map((prod) => {
                    return <div className='singleProCon' key={prod._id}>
                      <div className="proImageCon">
                        <img src={`${prod.photo[0]}`} alt="" />
                      </div>
                      <div className="proContentCon">
                      <h4 className="title">{prod.name}</h4>
                      <p>{prod.description}</p>
                      <div className="priceCon">
                      <strike>Rs. {prod.originalPrice}</strike>
                      <p>Rs. {prod.price}</p>
                      </div>
                      </div>
                    </div>
                  })}</div>
                  <h5 className='total'>Total : {item.totalAmt}</h5>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders
