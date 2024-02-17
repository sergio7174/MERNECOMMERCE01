import React from 'react'
import Layout from '../components/Layout'
import privacyPolicyPhoto from '../images/privacyPolicyPhoto.webp'

const Policy = () => {
  
  return (
    <Layout title={'Ecommerce-Privacy Policy'}>
      <section className="outerSection">
        <section className='Contact'>
          <section className="imageSection">
            <img className='AboutImageSectionImage' src={privacyPolicyPhoto} alt="" />
          </section>
          <section className="contentSection aboutContentSection">
            <p>When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information including credit card numbers Mention all types of accepted payments, email address, and phone number. This is called Order Information.

              Make sure you mention all other information that you collect.

              By Personal Information in this Privacy Policy, we are talking both about Device Information and Order Information.
            </p>
          </section>
        </section>
      </section>
    </Layout>
  )
}

export default Policy