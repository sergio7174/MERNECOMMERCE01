import React, { useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../redux/features/categorySlice'
import { HiShoppingBag } from 'react-icons/hi'
// Enterprise-class UI designed for web applications. A set of high-quality React components out of the box
import { message, Badge } from 'antd'
import axios from 'axios'
import SearchInput from './form/SearchInput'
import { setTags } from '../redux/features/tagsSlice'

const Header = () => {
    // get global state.user through useSelector((state) --> from redux-store to local const user 
    const { user } = useSelector((state) => state.user);
    // get global state.categories through useSelector((state) --> from redux-store to local const user
    const { categories } = useSelector((state) => state.categories);
    // get global state.tags through useSelector((state) --> from redux-store to local const tags
    const {tags} = useSelector((state) => state.tags);
    // get global state.cart through useSelector((state) --> from redux-store to local const cart 
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //get all categories
    const getAllCategory = async () => {
        try {
            // get all categories from backend through axios action GET
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-category`);
            // if get data is success
            if (res.data?.success) {
                // change category state with function: setCategories(res.data.category)) from   //categorySlice --> redux-store
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
        // call function  getAllCategory()
        getAllCategory();
        // eslint-disable-next-line
    }, []);

    //get all tags
    const getAllTags = async () => {
        try {
             // get all tags from backend through axios action GET
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/tag/get-all-tags`);
             // get data successfully
            if (res.data?.success) {
                // change tags state with function: dispatch(setTags(res.data.tags)); from   categorySlice --> redux-store
                dispatch(setTags(res.data.tags));
                // message.success('All tags fetched successfully')
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong in get-all-category");
        }
    }

    useEffect(() => {
        // function call getAllTags();
        getAllTags();
        // eslint-disable-next-line
    }, []);


    const handleLogoutFunc = () => {
        // clean localstore from any data
        localStorage.clear();
        // go to home page
        navigate('/')
        // when reload page, show message : Logout Successful
        window.reload();
        message.success('Logout Successful');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-secondary pe-3">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/"><HiShoppingBag /> E-COMMERCE</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <div className="searchInput">
                                <SearchInput />
                            </div>

                            {/* if user is admin - else if user is not admin  */}
                            {user?.isAdmin === "true" ? (<></>) : 
                           
                            ( <>
                                    <li className="nav-item">
                                        <NavLink to="/" className="nav-link" >Home</NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to={"/categories"} data-bs-toggle="dropdown">
                                            Category
                                        </Link>
                                        {/***if there are categories */}
                                        {categories && <ul className="dropdown-menu" >
                                            <li><Link to={`/categories`} className="dropdown-item">All Categories</Link></li>
                                            {/* {console.log(categories)}, show categories */}

                                            {categories.map((cat) => (
                                                <li key={cat._id}><Link to={`/category/${cat?.slug}`} className="dropdown-item">{cat.name}</Link></li>
                                            ))}

                                        </ul>}
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to={"/tags"} data-bs-toggle="dropdown">
                                            Tags
                                        </Link>
                                        {/***if there are tags - show menu dropdown options */}
                                        {tags && <ul className="dropdown-menu" >
                                            <li><Link to={`/tags`} className="dropdown-item">All tags</Link></li>
                                            {console.log(tags)}
                                            {/***show all tags */}
                                            {tags.map((tag) => (
                                                <li key={tag._id}><Link to={`/tag/${tag?.slug}`} className="dropdown-item">{tag.name}</Link></li>
                                            ))}

                                        </ul>}
                                    </li>
                                </>
                            )}
                            {/** if there is an user **/}
                            {user ? (<>
                                <li className={`${user?.isAdmin==="true" ? "nav-item dropdown adminDropDown" : "nav-item dropdown"}`}>
                                    <NavLink to="/user" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" >
                                        {user?.name}
                                    </NavLink>
                                    <ul className="dropdown-menu mr-3">
                                        <li><NavLink to={`/dashboard${user?.isAdmin === "true" ? '/admin' : '/user'}`} className="dropdown-item" >Dashboard</NavLink></li>
                                        {user && user.isAdmin === "false" ? <li className="nav-item">
                                            <Link to="/dashboard/user/wishList" className="dropdown-item">My WishList</Link>
                                        </li> : <></>}
                                        <li className="nav-item">
                                            <Link to="/" className="dropdown-item" onClick={handleLogoutFunc}>Logout</Link>
                                        </li>
                                    </ul>
                                </li>
                            </>
                            /***if there is not user - show those options */
                            ) : (<>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link" >Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link" >Login</NavLink>
                                </li>
                            </>)}
                            {/***if user is admin - show menu option Cart */}
                            {user?.isAdmin === "true" ? (<></>) : (
                                <>
                                    <li className="nav-item headerCartLi">
                                        <Badge count={cart?.length}>
                                            <NavLink to="/cart" className="nav-link" >Cart </NavLink>
                                        </Badge>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
