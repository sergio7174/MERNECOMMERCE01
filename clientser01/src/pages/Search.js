import React from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { setCart } from '../redux/features/cartSlice';

const Search = () => {
  const { results } = useSelector((state) => state.search);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  //decreaseProductQuantity Function
  const decreaseProductQuantity = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/decrease-product-quantity/${id}`);
      if (res.data.success) {
        console.log(res.data.updatedProduct);
        // message.success(res.data.message);
        // getAllProducts();
        // window.location.reload();
        navigate('/cart')
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong in decreaseProductQuantity func");
    }
  }

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h4 className='mt-3'>Search Results</h4>
          <h6 className='mb-3'>{results?.length < 1 ? "No products found" : `Found ${results.length} product`}</h6>
          {results && (
            <div className="allProductsBigContainer">
              {results?.map((product) => (
                <div key={product._id} className="card" style={{ width: "18rem" }}>
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`} className="card-img-top cardImage" alt={product.name} />
                  <div className="card-body">
                    <h4 className="card-title">{product.name}</h4>
                    <div className="productDescAndPrice">
                      <p className="productDesc card-text">{product.description.substring(0, 30)}...</p>
                      <p className="productPrice card-text">Rs. {product.price}</p>
                    </div>
                    <div className="productQuantity">
                      <p>Quantity Available : <strong>{product.quantity}</strong></p>
                    </div>
                    <div className="moreDetailsandAddToCartBtnContainer">
                      <button className="btn btn-primary" onClick={() => { navigate(`/product-detail/${product.slug}`) }}>More Details</button>
                      {product?.quantity > 0 ? (
                        <button className="btn btn-secondary" onClick={() => {
                          dispatch(setCart([...cart, product]));
                          localStorage.setItem("cart", JSON.stringify([...cart, product]))
                          message.success('Item added to cart');
                          decreaseProductQuantity(product._id);
                        }}>ADD TO CART</button>
                      ) : (<button className='btn btn-danger' disabled={true}>Out of Stock</button>)}
                      {/* <button className="btn btn-secondary" onClick={() => {
                        dispatch(setCart([...cart, product]));
                        localStorage.setItem("cart", JSON.stringify([...cart, product]))
                        message.success('Item added to cart')
                      }}>ADD TO CART</button> */}

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
          }
        </div>
      </div>
    </Layout>
  )
}

export default Search
