import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Adminmenu from '../../components/Adminmenu'
import axios from 'axios';
import { message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
// handle the image to server
import FileBase from "react-file-base64";
const { Option } = Select;

const CreateProduct = () => {

    const navigate = useNavigate();
    
    
    
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [tag, setTag] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState([]);
    const [shipping, setShipping] = useState("");
    const [isSpecial, setIsSpecial] = useState("");

    const [photoImage, setPhotoImage] = useState([]);
    const [selectImg, setSelectImage] = useState(null)
    const [isImgSelected, setIsImgSelected] = useState(false)

  /**new block added by me  ******************************/

      const [photoData, setPhotoData] = useState("")

  /**new block added by me  ******************************/




    //get all category
    const getAllCategory = async () => {
        try {
            // get all categories with axios action GET from server to local const res
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-category`)
            // if get data successfully
            if (res.data?.success) 
            // set categories to new state through setCategories(res.data?.category)
            {setCategories(res.data?.category)}
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in getAllCategory')
        }
    };

    useEffect(() => {
        // function call getAllCategory();
        getAllCategory();
        // EL segundo parámetro [] react asume que no interesan los cambios de ningún estado ni de ningún parámetro en las props, por lo que useEffect solo se ejecutara al inicio.
    }, []);

    //getAllTags Func
    const getAllTags = async () => {
        try {
            // get all tags with axios action GET to server to local const res
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/tag/get-all-tags`)
            // if get data successfully - set new state to tags throught setTags(res.data.tags)
            if (res.data.success) { setTags(res.data.tags)}
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in getAllTags')
        }
    };

    useEffect(() => {
        // function call getAllTags()
        getAllTags();
        // EL segundo parámetro [] react asume que no interesan los cambios de ningún estado ni de ningún parámetro en las props, por lo que useEffect solo se ejecutara al inicio.
    }, []); 

    // upload image to cloudinary
    const submitImage = () => {
        const data = new FormData()
        data.append('file', selectImg)
        data.append('upload_preset', 'ecom05')
        data.append('cloud_name', 'dib7eiw3v')
        fetch('https://api.cloudinary.com/v1_1/dib7eiw3v/image/upload', {
            method: 'post',
            body: data
        })
            .then((res) => res.json())
            .then((data) => {
                setPhoto([...photo, data.secure_url])
            }).catch((err) => {
                console.log(err)
            })

    }

    //create product func
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            // local const photo to handle photoData.imageFile from FileBase
            const photo = photoData.imageFile;
            // local object to handle form inputs product data values
            const productDetail={
                name,
                description,
                originalPrice,
                price,
                quantity,
                photo,
                category,
                tag,
                isSpecial,
                shipping
            }

            alert ("Estoy en createProduct.js - line 122 - photo64:"+photo);
            alert ("Estoy en createProduct.js - line 123 - name:"+productDetail.name);


            // create product action with axios action POST to server -- to local const res
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, 
            // data to send to server
            productDetail, {
                // verify if there is a token, that means that an user is logged In
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
            // if got action , and res is success  - show success message from backend    
            if (res.data?.success) {
                message.success(res.data.message);
                // navigate to
                navigate('/dashboard/admin/products')
            } else {
                message.error(res.data?.message)
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in create product')}}

    return (
        <Layout title={'Dashboard - Create Product'}>
            <div className='AdminDashboard'>
                {/* container-fluid m-3 p-3 */}
                <div className="row">
                    <div className="sideAdminDashboard col-md-3 ">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                        <div className='mainAdminDashboardOfCreateCategory'>
                            <h4 className='text-center  mb-3'>Create Product</h4>
                            <div className="m-1 w-88">
                                <label className='labelClass'>Select category : </label>
                                <Select bordered={false} placeholder="Select a category" size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
                                    {/***if there are categories - show them */}
                                    {categories?.map((cat) => (
                                        <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                                    ))}
                                </Select>
                                <button onClick={() => { navigate('/dashboard/admin/create-category') }} className='btn btn-primary mb-3'>Add Category</button> <br />
                                <label className='labelClass'>Select tag : </label>
                                <Select bordered={false} placeholder="Select a tag" size='large' showSearch className='form-select mb-3' onChange={(value) => { setTag(value) }}>

                                    {tags?.map((tag) => (
                                        <Option key={tag._id} value={tag._id}>{tag.name}</Option>
                                    ))}
                                </Select>

                                <div className="mb-3">
                                    {/***if there is not imagen selected */}
                                    {isImgSelected === false ? <label className='btn btn-outline-secondary col-md-12'>
                                        {"Choose Photo"}
                                        <input type="file" name="photo" accept='image/*' onChange={(e) => {
                                            setPhotoImage([...photoImage, e.target.files[0]])
                                            setSelectImage(e.target.files[0])
                                            setIsImgSelected(true)
                                        }} hidden />
                                    </label> : <label className='btn btn-outline-secondary col-md-12'>
                                        {"Upload Photo .. Only to see Photo to Save"}
                                        <input type="button" onClick={(e) => {
                                            submitImage()
                                            setIsImgSelected(false)
                                        }} hidden />
                                    </label>}

                                    </div>
                          {/*** block to get photo, to see and save  ***/}
                                <div className="mb-3 div_prod">
                                    {photoImage && ( photoImage.map((pho) => {
                                    return <img src={URL.createObjectURL(pho)} alt="" height={"200px"} className='img img-responsive admin_prod_img' />
                                        })
                                    )}

                    {/** action to get product photo, to save it */}                
                    <label className='btn btn-outline-secondary col-md-12' style={{color:"black"}}> 
                   
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => {
                              setPhotoData({...photoData, imageFile: base64 })}}/>
                              &nbsp; &nbsp; &nbsp;{"Save Photo"}
                    </label>
                    {/*** End block to get photo, to see and save  ***/}
                    
                                </div>
                       

                                <div className="mb-3">
                                    <label className='labelClass'>Product Name : </label>
                                    <input type="text" value={name} placeholder='write a name' className='form-control' onChange={(e) => setName(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label className='labelClass'>Product Description : </label>
                                    <textarea value={description} placeholder='write description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                                </div>

                                <label className='labelClass'>Special Product : </label>
                                <Select bordered={false} placeholder="Special product" size='large' showSearch className='form-select mb-3' onChange={(value) => { setIsSpecial(value) }}>
                                    <Option value={`Yes`}>Yes</Option>
                                    <Option value={`No`}>No</Option>
                                </Select>

                                <div className="mb-3">
                                    <label className='labelClass'>Original Price : </label>
                                    <input type="number" value={originalPrice} placeholder='write original price' className='form-control' onChange={(e) => setOriginalPrice(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label className='labelClass'>Selling Price : </label>
                                    <input type="number" value={price} placeholder='write price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label className='labelClass'>Quantity : </label>
                                    <input type="number" value={quantity} placeholder='write quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                                
                                <div className="mb-3">
                                    <label className='labelClass'>Shipping : </label>
                                    <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => { setShipping(value) }}>
                                        <Option value="0">Yes</Option>
                                        <Option value="1">No</Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" onClick={handleCreate}>CREATE PRODUCT</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
