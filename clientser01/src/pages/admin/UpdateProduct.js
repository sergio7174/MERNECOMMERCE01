import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Adminmenu from '../../components/Adminmenu'
import axios from 'axios';
import { message, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
// handle the image to server
import FileBase from "react-file-base64";

const { Option } = Select;

const UpdateProduct = () => {


    const navigate = useNavigate();
    const params = useParams();
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
    const [id, setId] = useState("");
    const [isSpecial, setIsSpecial] = useState("");


    const [selectImg, setSelectImage] = useState(null)
    const [isImgSelected, setIsImgSelected] = useState(false)
    const [photoImage, setPhotoImage] = useState([]);
    const [imgIndex, setImgIndex]=useState(null)

    /**new block added by me  ******************************/

    const [photoData, setPhotoData] = useState("")

    /**new block added by me  ******************************/

    //get single product
    const getSingleProduct = async () => {

        try {
            // get single product from server with axios action GET --> to local const res
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`);
            console.log(res);
            // if action from server is success
            if (res.data?.success) {
                console.log(res.data.product)
                //get the data from backend and instance them to locals const
                setName(res.data.product.name);
                setId(res.data.product._id)
                setDescription(res.data.product.description);
                setOriginalPrice(res.data.product.originalPrice);
                setPrice(res.data.product.price);
                setQuantity(res.data.product.quantity);
                setCategory(res.data.product.category._id);
                setTag(res.data.product.tag._id)
                setShipping(res.data.product.shipping)
                setIsSpecial(res.data.product.isSpecial)
                setPhoto([...res.data.product.photo])
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in getSingleProduct')
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, []);

    //get all category
    const getAllCategory = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-category`)
            if (res.data?.success) {
                setCategories(res.data?.category)
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in getAllCategory')
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //getAllTags Func
    const getAllTags = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/tag/get-all-tags`)
            if (res.data?.success) {
                setTags(res.data?.tags)
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in getAllTags')
        }
    };

    useEffect(() => {
        getAllTags();
    }, []);


    //update product func
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // const productData = new FormData();
            // productData.append("name", name);
            // productData.append("description", description);
            // productData.append("originalPrice", originalPrice);
            // productData.append("price", price);
            // productData.append("quantity", quantity);
            // productData.append("isSpecial", isSpecial);
            // photo && productData.append("photo", photo);
            // productData.append("category", category);
            // productData.append("tag", tag)

            // local const photo to handle photoData.imageFile from FileBase
            const photo = photoData.imageFile;
            const productDetail = {
                name,
                description,
                originalPrice,
                price,
                quantity,
                photo,
                category,
                tag,
                isSpecial
            }
            console.log(photo)
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productDetail, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data?.success) {
                message.success(res.data.message);
                navigate('/dashboard/admin/products')
            } else {
                message.error(res.data?.message)
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in update product')
        }
    }

    //handleDelete func
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data?.success) {
                message.success(res.data.message);
                navigate('/dashboard/admin/products')
            } else {
                message.error(res.data?.message)
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in delete product')
        }
    }

    // upload to cloudinary
    const submitImage = () => {
        const data = new FormData()
        data.append('file', selectImg)
        data.append('upload_preset', 'sdecom')
        data.append('cloud_name', 'dveema5rd')
        fetch('https://api.cloudinary.com/v1_1/dveema5rd/image/upload', {
            method: 'post',
            body: data
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(photo)
                setPhoto(()=>{
                    const pic = []
                    for(let i=0;i<photo.length;i++){
                        if(i==imgIndex){
                            pic[i] = data.secure_url
                        }
                        else{
                            pic[i] = photo[i]
                        }
                    }
                    return pic
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    const removeImage=(index)=>{
        console.log(index)
        const p=[]
        for(let i =0 ;i<photo.length;i++){
            if(i!=index){
                p.push(photo[i])
            }
        }
        setPhoto([...p])
    }

    return (
        <Layout title={'Dashboard - Create Product'}>
            <div className='AdminDashboard'>
                {/* container-fluid m-3 p-3 */}
                <div className="row">
                    <div className="sideAdminDashboard col-md-3">
                        <Adminmenu />
                    </div>
                    <div className="col-md-9">
                        <h4 className='text-center mb-3'>Update Product</h4>
                        <div className="m-1 w-88">
                            <label className='labelClass'>Select Category : </label>
                            <Select bordered={false} placeholder="Select a category" size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }}
                                value={category}>
                                {categories?.map((cat) => (
                                    <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                                ))}
                            </Select>
                            <label className='labelClass'>Select Tag : </label>
                            <Select bordered={false} placeholder="Select a tag" size='large' showSearch className='form-select mb-3' onChange={(value) => { setTag(value) }}
                                value={tag}>
                                {tags?.map((tag) => (
                                    <Option key={tag._id} value={tag._id}>{tag.name}</Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                {isImgSelected == false ? <label className='btn btn-outline-secondary col-md-12'>
                                    {"Choose Photo"}
                                    <input type="file" name="photo" accept='image/*' onChange={(e) => {
                                        setImgIndex(photo.length)
                                        setPhoto([...photo, e.target.files[0]])
                                        setSelectImage(e.target.files[0])
                                        setIsImgSelected(true)
                                    }} hidden />
                                </label> : <label className='btn btn-outline-secondary col-md-12'>
                                    {"Upload Photo"}
                                    <input type="button" onClick={(e) => {
                                        submitImage()
                                        setIsImgSelected(false)
                                    }} hidden />
                                </label>}
                            </div>
                            <div className="mb-3 div_prod">
                                {photo && (
                                    photo.map((pho, index) => {
                                        return <img onClick={() => removeImage(index)} key={index} src={typeof pho == "string" ? pho : URL.createObjectURL(pho)} alt="" className='img img-responsive admin_prod_img' />
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
                            <label className='labelClass'>Select Description : </label>
                                <textarea value={description} placeholder='write description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <label className='labelClass'>Special Product : </label>
                            <Select bordered={false} placeholder="Special product" size='large' showSearch className='form-select mb-3' value={isSpecial === "Yes" ? "Yes" : "No"} onChange={(value) => { setIsSpecial(value) }}>
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
                                <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => { setShipping(value) }}
                                    value={shipping ? "Yes" : "No"}>
                                    <Option value="0">Yes</Option>
                                    <Option value="1">No</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>UPDATE PRODUCT</button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={handleDelete}>DELETE PRODUCT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct
