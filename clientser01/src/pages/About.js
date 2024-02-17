import React from 'react'
import Layout from '../components/Layout'
import aboutUs from '../images/aboutUs.jpeg'

const About = () => {
  return (
    <Layout title={'Ecommerce-About-Us'} >
      <section className="outerSection">
        <section className='Contact About'>
          <section className="imageSection AboutImageSection">
            <img className='AboutImageSectionImage' src={aboutUs} alt="aboutUsPhoto" />
          </section>
          <section className="contentSection aboutContentSection">
            <p>Welcome to our online store, where we aim to provide a seamless shopping experience for all your needs. Our team is dedicated to offering high-quality, affordable, and sustainable products, with a focus on ethical and responsible sourcing. We believe in transparency, customer satisfaction, and community, and we work tirelessly to ensure that we meet our customers' expectations. We take pride in offering a diverse range of products that cater to all your needs, from fashion accessories and beauty products to home essentials.
            </p>
          </section>
        </section>
      </section>
    </Layout>
  )
}

export default About