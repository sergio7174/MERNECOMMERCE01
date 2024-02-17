import React from 'react'
import Layout from '../components/Layout'
import { HiOutlineMail } from 'react-icons/hi';
import { AiFillPhone } from 'react-icons/ai';
import { FaHeadphones } from 'react-icons/fa';
import contactPhoto from '../images/contactPhoto.jpg'

const Contact = () => {
    return (
        <Layout title={'Ecommerce-Contact-Us'}>
            <section className="outerSection">
            <section className='Contact'>
                <section className="imageSection">
                    <img src={contactPhoto} alt="" />
                </section>
                <section className="contentSection">
                    <h2>CONTACT US</h2>
                    <p>for any queriy and info about product, feel free to call us anytime <br />we are 24x7 available</p>
                    <p><HiOutlineMail /> : www.help@ecommerce.com</p>
                    <p><AiFillPhone /> : 0412-9403149</p>
                    <p><FaHeadphones /> : 1000-0000-0000 (toll-free)</p>
                </section>
            </section>
            </section>
        </Layout>
    )
}

export default Contact