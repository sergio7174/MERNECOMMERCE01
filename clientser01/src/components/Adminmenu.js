import React from 'react'
import { NavLink } from 'react-router-dom'

const Adminmenu = () => {
    return (
        <>
            <div className="adminMenuDiv text-center">
                <h5>Admin Panel</h5>
                <div className="list-group">
                    <NavLink to="/dashboard/admin/create-category" className="adminMenuNavLink list-group-item list-group-item-action">Create Category</NavLink>
                    <NavLink to="/dashboard/admin/create-tag" className="adminMenuNavLink list-group-item list-group-item-action">Create Tag</NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="adminMenuNavLink list-group-item list-group-item-action">Create Product</NavLink>
                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action adminMenuNavLink">Products</NavLink>
                    <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action adminMenuNavLink">Users</NavLink>
                </div>
            </div>
        </>
    )
}

export default Adminmenu
