import React, { useEffect, useState } from 'react'
import Adminmenu from '../../components/Adminmenu'
import Layout from '../../components/Layout'
import axios from 'axios';
import { message } from 'antd';
import { Link } from 'react-router-dom';

const Products = () => {

    // local const products
    const [products, setProducts] = useState([]);

    //get all products func
    const getAllProducts = async () => {
        try {
            // get all products with axios action GET to server --> to local const res
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-all-products`);
            // if got data from server successfully
            if (res.data?.success) {
                // set new product state through setProducts(res.data.products)
                setProducts(res.data.products)
                // message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong in getAllProducts")}}

    useEffect(() => {
        // function call getAllProducts()
        getAllProducts();
        // EL segundo parámetro [] react asume que no interesan los cambios de ningún estado ni de ningún parámetro en las props, por lo que useEffect solo se ejecutara al inicio.
    }, [])

    return (
        <Layout>
            {/***if there is a product */}
            {products && <> <div className='AdminDashboard'>
                {/* container-fluid m-3 p-3 */}
                    <div className="row">
                        <div className="sideAdminDashboard col-md-3">
                            <Adminmenu />
                        </div>
                        <div className="col-md-9">
                            <h4 className="text-center mb-3">All Products List</h4>
                            <div className="productListContainer">
                                {products?.map((product) => (
                                    <Link to={`/dashboard/admin/product/${product.slug}`} key={product._id} className='productLink'>
                                        <div className="cardContainer card m-2" style={{ width: "18rem" }}>
                                            <img src={`${product.photo[0]}`} className="card-img-top cardImage" alt={product.name} />
                                            <div className="card-body  productsNameAndDescDiv">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text productsNameAndDescDivPara">{product.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </Layout>
    )
}

export default Products
