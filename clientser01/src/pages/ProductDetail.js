import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { setProducts } from '../redux/features/productSlice';
import { setCart } from '../redux/features/cartSlice';

const ProductDetail = () => {
    // const { products } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [productObj, setProductObj] = useState(null);
    const { cart } = useSelector((state) => state.cart);
    const params = useParams();
    const [selectedIndex, setSelectedIndex]=useState(0)

    useEffect(() => {
        let existingCartItem = localStorage.getItem("cart");
        if (existingCartItem) {
            setCart(JSON.parse(existingCartItem));
        }
    }, []);

    const decreaseProductQuantity = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/decrease-product-quantity/${id}`);
            if (res.data.success) {
                console.log(res.data.updatedProduct);
                // message.success(res.data.message);
                // getAllProducts();
                getSingleProduct();
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong in decreaseProductQuantity func");
        }
    }


    //getSingleProduct
    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`);
            console.log('hi')
            if (res.data?.message) {
                setProductObj(res.data?.product);
                // message.success(res.data.message);
            } else {
                message.success(res.data.message);
            }
        } catch (error) {
            message.error('Something went wrong in getSingleProduct')
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, []);

    return (
        <Layout>
            {productObj!=null && <>
                <div className="ProductDetail">
                    {/* row-container m-3 d-flex */}
                    {console.log(productObj)}
                    <div className="ProductDetailImageDiv">
                        {/* col-md-6 */}
                        <div className="imagesDiv">
                            {productObj.photo.map((pho, index)=>{
                                return <div onClick={()=>setSelectedIndex(index)} className={`singlePhoDiv ${index == selectedIndex ?"active_img":""}`}style={{backgroundImage: `url(${pho})`}}></div>
                            })}
                        </div>
                        <img src={`${productObj.photo[selectedIndex]}`} className="card-img-top detail_prod_img" alt={productObj.name} />
                    </div>
                    <div className="productDetailContentDiv">
                        {/* col-md-6 text-center */}
                        <h2>Product Details</h2>
                        <h6>Name : {productObj.name}</h6>
                        <h6>Description : {productObj.description}</h6>
                        <h6>Original Price : {productObj.originalPrice}</h6>
                        <h6>Selling Price : {productObj.price}</h6>
                        <h6>Quantity : {productObj.quantity}</h6>
                        <h6>Category : {productObj?.category?.name}</h6>
                        {/* <h6>Shipping : {products.shipping}</h6> */}
                        {productObj.quantity > 0 ? (
                            <button className="btn btn-secondary" onClick={() => {
                                dispatch(setCart([...cart, productObj]));
                                localStorage.setItem("cart", JSON.stringify([...cart, productObj]))
                                message.success('Item added to cart'); decreaseProductQuantity(productObj._id);
                            }}>ADD TO CART </button>
                        ) : (<button className='btn btn-danger' disabled={true}>Out Of Stock</button>)}
                        {/* ms-1 */}
                    </div>
                </div>
            </>}
        </Layout>
    )
}

export default ProductDetail
