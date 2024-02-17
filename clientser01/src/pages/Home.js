import React, { useEffect, useState } from 'react'
import { redirect } from "react-router-dom";

import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux'
import { message, Button } from 'antd';
import axios from 'axios';
import { setProducts } from '../redux/features/productSlice';
import { setCategories } from '../redux/features/categorySlice';
import { Checkbox, Radio } from 'antd';
import { PriceData } from '../components/PriceData';
import { useNavigate } from 'react-router-dom';
import { setCart } from '../redux/features/cartSlice';
import '../styles/home.css'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
//import { setUser } from '../redux/features/authSlice';
import Products from './admin/Products';

const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get state.(user, products, categories, cart) from redux-toolkit store
  const  {user}  = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { cart } = useSelector((state) => state.cart);
  
  
  // set local const state.checked, radio, wishItem, loggedInUser - initial state
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [wishItem, setWishItem] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    
    // set loggedInUser value as user
    setLoggedInUser(user);
    // if user isAdmin===true --> navigate to: /dashboard/admin/products
    if(user?.isAdmin==='true'){
     // navigate('/dashboard/admin/products')
     redirect("/dashboard/admin/products");
    } 
  }, [user])

  useEffect(() => {
    /**get from localStorage cart to var existingCartItem */
    let existingCartItem = localStorage.getItem("cart");
    // if existingCartItem===true
    if (existingCartItem) {
      // set the cart value from localStore through setCart function
      setCart(JSON.parse(existingCartItem));
    }
         // EL segundo parámetro [] (the dependency array of useEffect hook) react asume que no interesan los cambios de ningún estado ni de ningún parámetro en las props, por lo que useEffect solo se ejecutara al inicio.
  }, [] ); // <-- this is the dependency array of useEffect hook);

  //decreaseProductQuantity Function
  const decreaseProductQuantity = async (id) => {
    try {
      // decrease product quantity action with axios action GET to server to local const res 
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/decrease-product-quantity/${id}`);
      // if decrease action is success
      if (res.data.success) {
        // message.success(res.data.message);
        console.log(res.data.updatedProduct);
        // function call getAllProducts()
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong in decreaseProductQuantity func");
    }
  }

  //get all categories
  const getAllCategory = async () => {
    try {
      // get all categories action with axios action GET to server to local const res
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-category`);
      // if action is successfull
      if (res.data?.success) {
        // set new state.categories to redux-toolkit store through:  dispatch(setCategories(res.data.category));
        dispatch(setCategories(res.data.category));
        // message.success('All categories fetched successfully')
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong in get-all-category");
    }}

  useEffect(() => {
    // function call getAllCategory()
    getAllCategory();
    // eslint-disable-next-line
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      // get all products action with axios action GET to server to local const res
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-all-products`);
      // if action is success
      if (res.data?.success) {
        // set new state.products to redux-toolkit store through:  dispatch(setProducts(res.data?.products));
        dispatch(setProducts(res.data?.products));
        // message.success("All products fetched successfully")
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong in get-all-products")
    }
  }

  const verifyusercheckedradio= (user,checked,radio)=>{

    // if user exits and checked & radio.length are false
    if (user?.name && (!checked.length || !radio.length)) {
      setWishItem(user.wishlist)
      // function call getAllProducts();
      getAllProducts();
    }
    // if checked or radio.length are false
    else if (!checked.length || !radio.length) {
      getAllProducts();
    }

  }



  useEffect(() => {
    verifyusercheckedradio(user,checked,radio);
    
  }, [checked, radio, wishItem, loggedInUser,user]);
  //[]);
  // handleFilter func (filter by category)
  const handleFilter = (value, id) => {
    // if there is a checked option selected
    let all = [...checked];
    // if exist a value or value===true
    if (value) 
         { all.push(id);}  // The push() method of Array instances adds the specified elements to the end of an array and returns the new length of the array.
    // The filter() method of Array instances creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.
    else { all = all.filter((cat) => cat !== id);}
    // set the new value of checked with var all[] values
    setChecked(all);
  };

  //get filtered product
  const filterProduct = async () => {
try {
   // get the product-filters with axios action POST to server, to local const res
   const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, 
      {checked, radio });
      // product-filter action get success 
      if (res.data?.success) {
        // message.success(res.data.message);
        // update the value products in redux-store through the functions: dispatch(setProducts(res.data.products));
        dispatch(setProducts(res.data.products));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong in filtered product')
 }}

  // add product to user wishlist
  const addToUserWishlist = async (productId) => {
    try {
      // addToUserWishlist action with axios action POST to server --> local const res
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/wishlist/add`, { productId }, {
        // verify if exist token in localStorage, it means an user logged In to send data
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      });
      if (res.data?.success) {
        // message.success(res.data.message);
        // dispatch(setProducts(res.data.products));
      } else {
        message.error(res.data.message);
      }
      window.location.reload()
    } catch (error) {
      console.log(error);
      message.error('Something went wrong while adding product to wishlist!')
    }
  }

  // remove product from user wishlist
  const removeFromUserWishlist = async (productId) => {
    try {
      // removeFromUserWishlist action with axios action POST to server --> local conmst res
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/wishlist/remove`, { productId }, {
        // verify if exist token in localStorage, it means an user logged In to send data
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
      });
      if (res.data?.success) {
        
      } else {
        message.error(res.data.message);
      }
      window.location.reload()
    } catch (error) {
      console.log(error);
      message.error('Something went wrong while adding product to wishlist!')
    }
  }

  // login to add to wishlist
  const loginToAddToWishList = () => { navigate('/login')}

  useEffect(() => {
    // if checked or radio have been selected --> call function filterProduct();
    if (checked.length || radio.length) filterProduct();

  }, [checked, radio]) // if any of those local const change --> render componet

  return (
    <div style={{background:"linear-gradient(to right top,#9f9696,#545bc9"}}>
      {/***exist loggedInUse or loggedInUse===true */}
      {loggedInUser ? 
      
            // exist loggedInUse or loggedInUse===true and loggedInUser?.isAdmin === 'false'

      <div> {loggedInUser?.isAdmin === 'false' ? 
      
      /***block begining with two conditions: loggedInUser=== true, 
                                              loggedInUser.isAdmin === 'false'  *****/
      <>

          {/***exist products or products===true */}
          {products && <Layout title={"All Products - Best Offers"}>

      
            <div className={`${user?.isAdmin === "true" ? "HomeForAdmin" : "Home"}`}>

              <div className="homeSideContainer">
              
                {/* filter by category */}
              
                <h6 className="homeFilterHeading">Filter By Category</h6>
                <div className="homeFilterByCatContainer">
                  {/** if categories exist or === true, create new array, and show categories */}
                  {categories?.map((cat) => (
                    <Checkbox  key={cat._id}
                      onChange={(e) => handleFilter(e.target.checked, cat._id)}>{cat.name}</Checkbox>
                  ))}
                </div>

                {/* filter by price */}
                <h6 className="homeFilterHeading homeFilterByPriceHeading">Filter By Price</h6>
                <div className="homeFilterByCatContainer">
                  <Radio.Group onChange={e => setRadio(e.target.value)}>
                    {/***if PriceData exits or ===true */}
                    {PriceData?.map((p) => (
                      <div className='homeFilterByCatContainerRadioDiv' key={p._id}>
                        <Radio  value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
                
                
                
                
                <div>
                  <Button className="btn btn-primary resetFiltersBtn" onClick={() => window.location.reload()}>Reset Filters</Button>
                </div>
              </div>

              <div className="homeMainContainer">
                {/* {JSON.stringify(checked, null, 4)} */}
                {/* {JSON.stringify(radio, null, 4)} */}
                <h4 className="allProductsHeading">Our Special Products</h4>
                <div className="allProductsBigContainer">
                  {products?.map((product) => {
                    if (product.isSpecial === "Yes") {
                      return <div key={product._id} className="card" style={{ width: "18rem" }}>
                        <img src={`${product.photo[0]}`} className="card-img-top cardImage" alt={product.name} />
                        <div className="card-body">
                          <h4 className="card-title">{product.name}</h4>


                          <div className="productDescDiv">
                            <p className="productDesc card-text">{product.description.substring(0, 30)}...</p>
                          </div>

                          <div className="productPriceDiv">
                            <p className="productOriginalPrice card-text"><strike>$. {product.originalPrice}</strike></p>
                            <p className="productPrice card-text">$. {product.price}</p>
                          </div>

                          <div className="productQuantity">
                            <p>Stock : <strong>{product.quantity}</strong></p>

                            {/*** */}
                            {user && user?.isAdmin === "false" ? (
                              <>
                              {
                                //********* fill and outfill Red heart after stock option ******/
                                // wishItem local const find in array
                                wishItem.find((wish) => {
                                  if (wish._id === product._id) {
                                  
                                    return true
                                  }
                                }) ? <p className='wishListHeartSymbol' onClick={() => removeFromUserWishlist(product._id)}>
                                  <AiFillHeart />
                                  </p> : <p className='wishListHeartSymbol' onClick={() => addToUserWishlist(product._id)}><AiOutlineHeart /></p>
                              }
                              </>
                        // end block to fill and outfill Red heart after stock option

                            ) : <><p className='wishListHeartSymbol' onClick={() => loginToAddToWishList()}><AiOutlineHeart /></p></>}
                          </div>




                          <div className="moreDetailsandAddToCartBtnContainer">
                            <button className="btn btn-primary" onClick={() => 
                              { navigate(`/product-detail/${product.slug}`) }}>More Details</button>
                            {/** product?.quantity > 0 -- show button ADD TO CART */}

                            {product?.quantity > 0 ? (
                              <button className="btn btn-secondary" onClick={() => {
                                dispatch(setCart([...cart, product]));
                                localStorage.setItem("cart", JSON.stringify([...cart, product]))
                                message.success('Item added to cart');
                                decreaseProductQuantity(product._id);
                              }}>ADD TO CART</button>
                              /** product?.quantity = 0 -- show button: Out of Stock in red */
                            ) : (<button className='btn btn-danger' disabled={true}>Out of Stock</button>)}
                          </div>
                        </div>
                      </div>
                    }
                  }
                  )}
                </div>
              </div>




                </div>




          </Layout>}




        </> : <Products />} 
       
      </div> : 
       /***block end with two conditions: loggedInUser=== true, 
                                          loggedInUser.isAdmin === 'false'  *****/

      /****block to show FILTERS BY CATEGORIES AND PRICES WHEN NOBODY IS LOGGED IN ***/
      <>

        {/***if products exits */}      
        {products && <Layout title={"All Products - Best Offers"}>
          {/***if user is admin - classname is: true:HomeForAdmin, false: Home */}
          <div className={`${user?.isAdmin === "true" ? "HomeForAdmin" : "Home"}`}>

            <div className="homeSideContainer">
              {/* filter by category */}

              <h6 className="homeFilterHeading">Filter By Category</h6>
              <div className="homeFilterByCatContainer">
              {categories?.map((cat) => (
                  <Checkbox className={`${user?.isAdmin === "true" ? "homeFilterByCatContainerChechboxForAdmin" : "homeFilterByCatContainerChechbox"}`} key={cat._id}
                    onChange={(e) => handleFilter(e.target.checked, cat._id)}
                  >{cat.name}</Checkbox>
              ))}
              </div>

              {/* filter by price */}
              
              <h6 className="homeFilterHeading homeFilterByPriceHeading">Filter By Price</h6>
              <div className="homeFilterByCatContainer">
                
                {/** Radio Comes from imported { Checkbox, Radio } from 'antd'; */}
                {/** setRadio comes from local const radio */}

               <Radio.Group onChange={e => setRadio(e.target.value)}>
                {/***PriceData COMES FROM IMPORTED FILE PriceData.js - WHERE DATA PRICE OBJECT IS */}
                  {PriceData?.map((p) => (

                    <div className='homeFilterByCatContainerRadioDiv' key={p._id}>
                      <Radio className={`${user?.isAdmin === "true" ? "homeFilterByCatContainerRadioForAdmin" : ""}`} value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              
            {/**end of block to show FILTERS BY CATEGORIES AND PRICES WHEN NOBODY IS LOGGED IN ***/}   
              
    {/**  block to show BUTTON Reset Filters, WHEN NOBODY IS LOGGED IN ***/} 
              </div>
              <div>
                {<Button className="btn btn-primary resetFiltersBtn" onClick={() => window.location.reload()}>Reset Filters</Button>}
              </div>
            </div>
          
      {/**end of block to show BUTTON Reset Filters, WHEN NOBODY IS LOGGED IN *** ***/} 

       {/**  block to cart with Our Special Products , WHEN NOBODY IS LOGGED IN ***/} 

            <div className="homeMainContainer">
              {/* {JSON.stringify(checked, null, 4)} */}
              {/* {JSON.stringify(radio, null, 4)} */}
              <h4 className="allProductsHeading">Our Special Products</h4>

              <div className="allProductsBigContainer d-flex flex-row ">

                {products?.map((product) => {
                  {/*** if (product.isSpecial === "Yes" block begining***/}
                   if (product.isSpecial === "Yes") {

                   {/* return <div key={product._id} className="card" style={{ width: "18rem" }}>*/}
                   return <div key={product._id} className="card" style={{ width: "40%" }}>
                      <img src={`${product.photo[0]}`} className="card-img-top cardImage" 
                           alt={product.name} />
                      <div className="card-body">
                        <h4 className="card-title">{product.name}</h4>


                        <div className="productDescDiv">
                          <p className="productDesc card-text">{product.description.substring(0, 30)}...</p>
                        </div>

                        <div className="productPriceDiv">
                          <p className="productOriginalPrice card-text"><strike>$. {product.originalPrice}</strike></p>
                          <p className="productPrice card-text">$. {product.price}</p>
                        </div>

                        <div className="productQuantity">
                          <p>Stock : <strong>{product.quantity}</strong></p>

                          {/**if user is logged In and is not Admin  **/}
                          
                          
                          {user && user?.isAdmin === "false" ? (
                            
                            <>{
                              
                              wishItem.find((wish) => {

                                if (wish._id === product._id) {
                                  return true
                                }
                              }) ? <p className='wishListHeartSymbol' onClick={() => removeFromUserWishlist(product._id)}><AiFillHeart /></p> : <p className='wishListHeartSymbol' onClick={() => addToUserWishlist(product._id)}><AiOutlineHeart /></p>
                              
                            }

                            
                            </>
                          /***if user exist and  user.isAdmin=== true *****/
                          ) : <>
                          <p className='wishListHeartSymbol' onClick={() => loginToAddToWishList()}><AiOutlineHeart /></p></>}
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
                        </div>
                      </div>
                    </div>
                  } /*** if (product.isSpecial === "Yes" END OF THE BLOCK***/ 



                }
                )}
              </div>
            </div>



          </div>
        </Layout>}
      </>}
    </div>
  )
}

export default Home
