import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const Pagenotfound = () => {
    const navigate = useNavigate();
  return (
    <Layout title={'Page-not-found-Go Back'}>
        <section className='Pagenotfound'>
            <h1>404</h1>
            <p>Oops ! Page Not Found</p>
            <button onClick={() => {navigate('/')}}>Go Back</button>
        </section>
    </Layout>
  )
}

export default Pagenotfound