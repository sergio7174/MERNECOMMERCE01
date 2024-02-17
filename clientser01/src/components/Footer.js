import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <h5>All Rights Reserved &copy; Sergio Moncada</h5>
      <p className="mt-2">
        <Link to='/about'>About</Link>|<Link to='/contact'>Contact</Link>|<Link to='/policy'>Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer