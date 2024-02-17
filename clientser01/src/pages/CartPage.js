import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../redux/features/cartSlice';
import axios from 'axios';
import { message } from 'antd';
import { TiTickOutline } from 'react-icons/ti';
import '../styles/cartPage.css'
// the Braintree JavaScript SDK allows you to easily accept payments while maintaining PCI (Payment Card Industry) compliance.
import DropIn from "braintree-web-drop-in-react";
import { setAddresses } from '../redux/features/addressSlice';
import { setOrders } from '../redux/features/orderSlice';

const CartPage = () => {
    const navigate = useNavigate();

    // redux-toolkit store state.user to local const user
    const { user } = useSelector((state) => state.user);
    // redux-toolkit store state.cart to local const cart
    const { cart } = useSelector((state) => state.cart);
    // redux-toolkit store state.addresses to local const addresses
    const { addresses } = useSelector((state) => state.addresses);
    // redux-toolkit store state.orders to local const orders
    const { orders } = useSelector((state) => state.orders);
    
    
    const dispatch = useDispatch();
    // locals const
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    const [totalAmt, setTotalAmt] = useState(null)

    //increaseProductQuantityFunc
    const increaseProductQuantityFunc = async (id) => {
        try { 
            // increase-product-quantity action by id with axios action GET to server -->
            // to local const res
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product//increase-product-quantity/${id}`);
            // if increase-product-quantity action is success - show success message
            if (res.data.success) {
                // console.log(res.data.updatedProduct);
                message.success(res.data.message);
                // get actual windows path to var path
                let path = window.location.pathname;
                window.location.reload();
                // navigate to actual path
                navigate(path);
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in increaseProductQuantityFunc')
        }
    }

    //get payment gateway token
    const getToken = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            // console.log(res.data)
            setClientToken(res.data?.clientToken);
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in getToken')
        }
    }

    // useEffect(() => {
    //     getToken()
    // }, [user?.token]);

    useEffect(() => {
        getToken()
    }, /*[localStorage.getItem("token")]);*/
    [user]);

    //handle payments
    const handlePayment = async () => {
        // console.log(cart);
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, { nonce, cart }, 
            
            {headers: {Authorization: `Bearer localStorage.getItem("token")`}
            });
            setLoading(false);
            // console.log(res);
            localStorage.removeItem('cart');
            dispatch(setCart([]));
            navigate('/dashboard/user/orders');
            message.success('Payment Completed Successfully')
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in handlePayment')
        }
    }

    //firstHandlePayment
    const firstHandlePayment = async () => {
        try {
            dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
            handlePayment();
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in firstHandlePayment Func')
        }
    }

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price
            });

            return total
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in totalPrice')
        }
    }



    //delete cart item
    const removeCartItem = (productId) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === productId)
            myCart.splice(index, 1);
            // console.log(myCart);
            dispatch(setCart(myCart));
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
            message.error("Something went wront in removeCartItem")
        }
    }

    //getAllAddress
    const getAllAddress = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/address/get-all-addresses`);
            if (res.data?.success) {
                //   message.success(res.data.message);
                dispatch(setAddresses(res.data?.addresses))
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAllAddress()
    }, [addresses.length]);

    //tickAddressFunc
    const tickAddressFunc = (id) => {
        try {
            // console.log(id)
            if (addresses.length > 0) {
                addresses.filter((address) => {
                    if (address._id === id) {
                        setDeliveryAddress(address);
                    } else { return ;}
                })
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong")
        }
    }

    // const getOrders = async () => {
    //     try {
    //         const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-orders`, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`
    //             }
    //         });
    //         dispatch(setOrders(res.data.orders))
    //     } catch (error) {
    //         console.log(error);
    //         message.error("Something went wrong")
    //     }
    // }

    // useEffect(() => {
    //     getOrders();
    // }, [orders.length]);

    //cashOnDeliveryFunc
    const cashOnDeliveryFunc = async () => {
        let total = 0;
        cart?.map((item) => {
            total = total + item.price
        });
        // const arr = cart;
        // console.log(arr);
        // console.log(cart);
        var myCar = [...cart]
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/orders/add-new`, { products: myCar, payment: "Cash on delivery", totalAmt: total }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (res.data?.success) {
            //   message.success(res.data.message);
            // dispatch(setAddresses(res.data?.addresses))

            navigate('/dashboard/user/orders');
            console.log(res.data)
        } else {
            message.error(res.data.message);
        }
        // console.log(myCar)
        // dispatch(setOrders([...myCar]))
        localStorage.removeItem("cart")
        dispatch(setCart([]));
        // { myCar.length > 0 && console.log(myCar, orders) }
    }




    return (
        <Layout>
            <div className="container CartPage">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-center bg-light p-2 mb-1 mt-3">
                            { /***shows Hello, if user.name exists, show: user.name else "Order now" */}
                            {`Hello, ${user?.name ? user.name : " Order Now !"}`}
                        </h4>
                    
                        <h6 className="text-center mb-3">
                            {/***if there is cart show: `You have ${cart.length} items in your cart  if there is an user name don't show any, else show: "please login to checkout"- else if there is not cart, show: "Your cart is empty" */}
                            {cart?.length ? `You have ${cart.length} items in your cart 
                            
                            ${user?.name ? "" : "please login to checkout"}` : "Your cart is empty"}
                        </h6>
                    
                    </div>
                </div>

                <div className="row CartPageMainContainer">
                    <div className="secondCartPageMainContainer col-md-8">
                        {/* {cart.length > 0 && console.log(cart)} */}
                        {/***if there is a cart - show : data of products */}
                        {cart?.map((product) => (
                            <div key={product._id} className="CartPageMainInnerContainer row p-3 mb-2 card flex-row">
                                <div className="cartPageImageContainer col-md-4">
                                    <img src={`${product.photo[0]}`} className="card-img-top" alt={product.name} width={"100px"} height={"100px"} />
                                </div>
                                <div className="CartPageMainCardContainer col-md-8">
                                    <h4>{product.name}</h4>
                                    <h6>{product.description}</h6>
                                    <h6>Price : {product.price}</h6>

                                    {/***button to remove cart item - call increaseProductQuantityFunc(product._id), at the same time */}
                                    <button className="btn btn-danger" onClick={() => { removeCartItem(product._id); increaseProductQuantityFunc(product._id) }}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/***if there is a cart, show:  */}
                    {cart?.length > 0 && <div className="col-md-4 text-center">
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4 className='mb-3'>Total : {totalPrice()}</h4>
                        <hr />
                        <hr className='mb-3' />
                        {/* <h5 className="cartPageAddress">
                            Select the address you want your product to get delivered on (Delivery Address) : </h5>
                        <br /> <br /> */}

                        {/* Address Container */}
                        {/**if there is a token, it means that an user is logged In ****/}
                        {localStorage.getItem("token") && (
                            <>
                                <div className="outerMostAddressDisplayContainer">
                                    {/***there is not deliveryAddress */}
                                    {!deliveryAddress ? (
                                        <>
                                     {/***this is the block when there is an addresses */}   
                                            {addresses?.length > 0 && <div className="addressDisplayContainer">
                                                {addresses?.map((address) => {
                                                    return <div className='addressSingleDiv' key={address._id}>
                                                        <div className="addTypeAndDeleteIconDiv">
                                                            <p className="addType">Address Type : {address.addressType}</p>

                                                            <TiTickOutline className='tickIcon' onClick={() => { tickAddressFunc(address._id) }} />
                                                        </div>
                                                        <p className="addName">Name : {address.name}</p>
                                                        <p className="addContact">Contact No. : {address.contact}</p>
                                                        <p className="addAddress">Address (Area or Street) : {address.address}</p>
                                                        <p className="addCity">City : {address.city}</p>
                                                        <p className="addState">State : {address.state}</p>
                                                        <hr />
                                                        <hr />
                                                    </div>
                                                })}
                                            </div>}


                                        </>
                                    /**the block begining when there is not an addresses ***/
                                    ) : (
                                        <>

                                            {/* {console.log(deliveryAddress)} */}
                                            {deliveryAddress != null && cart?.length > 0 ? (<div className='addressSingleDiv'>
                                                <div className="addTypeAndDeleteIconDiv">
                                                    <p className="addType">Address Type : {deliveryAddress.addressType}</p>
                                                </div>
                                                <p className="addName">Name : {deliveryAddress.name}</p>
                                                <p className="addContact">Contact No. : {deliveryAddress.contact}</p>
                                                <p className="addAddress">Address (Area or Street) : {deliveryAddress.address}</p>
                                                <p className="addCity">City : {deliveryAddress.city}</p>
                                                <p className="addState">State : {deliveryAddress.state}</p>
                                                <hr />
                                                <hr />
                                            </div>) : (<h4>Please add something to your cart to order</h4>)}
                                        </>
                                    )} {/**End of block when there is not addresses */}


                                </div>

                            </>
                        )}
            {/***block begining when deliveryAddress != null && cart.length > 0 */}
                        {deliveryAddress != null && cart.length > 0 ? (<div className="cashOnDeliveryDiv">
                            <button className='btn btn-primary' onClick={cashOnDeliveryFunc}>Cash on delivery</button>
                        </div>) : (" ")}
                        {orders.length > 0 ? console.log(orders) : console.log('no orders')}

                        <hr />
                        <hr />
                        <div className="mt-3">
                            {
                                !clientToken || !cart?.length ? (" ") : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken, paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />

                                        <button className='btn btn-primary' onClick={firstHandlePayment} disabled={!localStorage.getItem("token") || loading || !instance}>{loading ? "Processing..." : "Make Payment"}</button>
                                    </>
                                )
                            }
                        </div>
                    </div>}
                </div>
            </div>
        </Layout>
    )
}

export default CartPage