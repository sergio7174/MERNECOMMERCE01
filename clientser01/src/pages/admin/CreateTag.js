import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios';
import { message, Modal } from 'antd';

import Adminmenu from '../../components/Adminmenu';

const CreateTag = () => {

    // local const
    const [tags, setTags] = useState([]);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedSlug, setUpdatedSlug] = useState("");
    

    //handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // create tag action with axios action POST to server --> to local const res
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/tag/create-tag`, 
            { name, slug }, // parameter to send
            // validate if there is a token, it mean an user logged In 
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}});
            // if action return success - show message: tag created successfully
            if (res.data?.success) {
                message.success(`${res.data?.tag.name} tag created successfully`);
            // set name, slug to "";
                getAllTags();
                setName("");
                setSlug("");
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in form tag handleSubmit')}}

    //getAllTags Func
    const getAllTags = async () => {
        try {
            // get all tags with axios action GET to server --> to local const res
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/tag/get-all-tags`)
            // if action got success
            if (res.data?.success) { setTags(res.data.tags)} // set tag-State with setTags(res.data.
                                                             // tags)
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in getAllCategory')
        }
    };

    useEffect(() => {
        // function call getAllTags();
        getAllTags();
        // EL segundo parámetro [] react asume que no interesan los cambios de ningún estado ni de ningún parámetro en las props, por lo que useEffect solo se ejecutara al inicio.
    }, []);

    //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
     // update tag action with axios action PUT to server --> to local const res
      const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/tag/update-tag/${selected._id}`, { name: updatedName, slug : updatedSlug }, // data to update to server
      // verify token in localStorage, it means that an user is logged In
      { headers: { Authorization: `headers ${localStorage.getItem("token")}`}});
      // if action get success - show message: updated successfully;
      if (res.data.success) {
        message.success(`${updatedName} updated successfully`);
        // set updatedName, updatedSlud, open to "",false,null
        setUpdatedName("");
        setUpdatedSlug("");
        setOpen(false);
        setSelected(null);
        // call function getAllTags()
        getAllTags();
        
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong in update Category or handleUpdate func')
    }
  }

  //deleteTag func
  // delete tag action with axios action DELETE to server --> to local const res, using: tag._id
  const deleteTag = async (tag) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/tag/delete-tag/${tag._id}`, 
      
      // verify if there is a token in localStorage, to send action to server
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}});
      // if action get success, show message: deleted successfully
      if (res.data.success) {
        message.success(`${tag.name} deleted successfully`);
        // function call getAllTags(),
        getAllTags();
        
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong in delete category func')}}


    return (
<Layout title={'Dashboard - Create Category'}>
    <div className='AdminDashboard'>
     {/* container-fluid m-3 p-3 */}
        <div className="row">
            <div className="sideAdminDashboard col-md-3">
                <Adminmenu />
            </div>

             <div className="col-md-9">

                        <div className="mainAdminDashboardOfCreateCategory">
                            <h4 className='text-center mb-1'>Manage Tags</h4>
                            <div className="p-3 w-88">

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input type="text" name='name' className="form-control" placeholder='Enter new tag' value={name} onChange={(e) => setName(e.target.value)} />
                                        <input name='slug' type="text" className="form-control mt-3" placeholder='Enter slug' value={slug} onChange={(e) => setSlug(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                            <div className='w-88'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Slug</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tags?.map((tag) => (
                                            <tr key={tag._id}>
                                                <td >{tag.name}</td>
                                                <td >{tag.slug}</td>
                                                <td>
                                                    <button className="btn btn-primary m-2" onClick={() => { setOpen(true); setUpdatedName(tag.name); setUpdatedSlug(tag.slug); setSelected(tag) }}>Edit</button>
                                                    <button className="btn btn-danger ms-2" onClick={() => deleteTag(tag)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Modal onCancel={() => setOpen(false)} open={open} footer={null}>
                                {/* <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} /> */}
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-3">
                                        <input type="text" name='name' className="form-control" placeholder='Enter new category' value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                                        <input name='slug' type="text" className="form-control mt-3" placeholder='Enter slug' value={updatedSlug} onChange={(e) => setUpdatedSlug(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </Modal>
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateTag
