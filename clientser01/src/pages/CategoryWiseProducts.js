import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { message } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/features/productSlice';
// import { setCategories } from '../redux/features/categorySlice';
import { setCart } from '../redux/features/cartSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const CategoryWiseProducts = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { products } = useSelector((state) => state.products);
    const { cart } = useSelector((state) => state.cart);
    // const {categories} = useSelector((state) => state.categories);
    const [catObj, setCatObj] = useState({});
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const [wishItem, setWishItem] = useState([])
    const [loggedInUser, setLoggedInUser] = useState(null)
    useEffect(() => {
        setLoggedInUser(user)
        if (user?.isAdmin == 'true') {
            navigate('/dashboard/admin/products')
        }
    }, [user])

    useEffect(() => {
        let existingCartItem = localStorage.getItem("cart");
        if (existingCartItem) {
            setCart(JSON.parse(existingCartItem));
        }
    }, []);

    //decreaseProductQuantity Function
    const decreaseProductQuantity = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/decrease-product-quantity/${id}`);
            if (res.data.success) {
                console.log(res.data.updatedProduct);
                // message.success(res.data.message);
                // getAllProducts();
                getProductsByCategory();
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong in decreaseProductQuantity func");
        }
    }

    //getProductsByCategory func
    const getProductsByCategory = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
            if (res.data?.success) {
                dispatch(setProducts(res.data.products));
                setCatObj(res.data.category);
                // message.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            // message.error("Something went wrong in getProductsByCategory func");
        }
    }

    useEffect(() => {
        if (user?.name) {
            setWishItem(user.wishlist)
            getProductsByCategory();
        }
        else{
            getProductsByCategory();
        }
    }, [wishItem, loggedInUser]);

    // add product to user wishlist
    const addToUserWishlist = async (productId) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/wishlist/add`, { productId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (res.data?.success) {
                // message.success(res.data.message);
                dispatch(setProducts(res.data.products));
            } else {
                message.error(res.data.message);
            }
            navigate('/')
            window.location.reload()
        } catch (error) {
            console.log(error);
            message.error('Something went wrong while adding product to wishlist!')
        }
    }

    // remove product from user wishlist
    const removeFromUserWishlist = async (productId) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/wishlist/remove`, { productId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (res.data?.success) {
                // message.success(res.data.message);
                dispatch(setProducts(res.data.products));
            } else {
                message.error(res.data.message);
            }
            navigate('/')
            window.location.reload()
        } catch (error) {
            console.log(error);
            message.error('Something went wrong while adding product to wishlist!')
        }
    }

    // login to add to wishlist
    const loginToAddToWishList = () => {
        navigate('/login')
    }

    useEffect(() => {
        if (params?.slug) getProductsByCategory();
    }, [params?.slug]);

    return (
        <Layout>
            <div className='CategoryWiseProducts container mt-3'>
                <h4 className="text-center">Category - {catObj.name}</h4>
                <h6 className="text-center mb-3">{products?.length} result found</h6>
                <div className="allProductsBigContainer">
                    <div className="secondAllProductsBigContainer">
                        {/* d-flex flex-wrap m-3 */}
                        {products?.map((product) => (
                            <div key={product._id} className="cardContainer card m-3" style={{ width: "18rem" }}>
                                <img src={`${product.photo[0]}`} className="card-img-top cardImage" alt={product.name} />
                                <div className="card-body">
                                    <h4 className="card-title">{product.name}</h4>
                                    {/* <div className='productDescAndPrice'>
                                        <p className="productDesc card-text">{product.description.substring(0, 30)}...</p>
                                        <p className="productPrice card-text">Rs. {product.price}</p>
                                    </div> */}

                                    <div className="productDescDiv">
                                        <p className="productDesc card-text">{product.description.substring(0, 30)}...</p>
                                    </div>


                                    <div className="productPriceDiv">
                                        <p className="productOriginalPrice card-text"><strike>Rs. {product.originalPrice}</strike></p>
                                        <p className="productPrice card-text">Rs. {product.price}</p>
                                    </div>

                                    <div className="productQuantity">
                                        <p>Stock : <strong>{product.quantity}</strong></p>
                                        {user && user?.isAdmin == "false" ? (
                                            <>{
                                                wishItem.find((wish) => {
                                                    if (wish._id == product._id) {
                                                        return true
                                                    }
                                                }) ? <p className='wishListHeartSymbol' onClick={() => removeFromUserWishlist(product._id)}><AiFillHeart /></p> : <p className='wishListHeartSymbol' onClick={() => addToUserWishlist(product._id)}><AiOutlineHeart /></p>
                                            }
                                            </>
                                        ) : <><p className='wishListHeartSymbol' onClick={() => loginToAddToWishList()}><AiOutlineHeart /></p></>}
                                    </div>

                                    <div className='moreDetailsandAddToCartBtnContainer'>
                                        <button className="m-3 btn btn-primary" onClick={() => { navigate(`/product-detail/${product.slug}`) }}>More Details</button>
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
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryWiseProducts
