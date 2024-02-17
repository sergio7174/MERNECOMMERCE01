import React from 'react'
import { message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword, setResults } from '../../redux/features/searchSlice';

const SearchInput = () => {
    const navigate = useNavigate();
     // get state.search from redux-store --> to local const keyword
    const {keyword} = useSelector((state) => state.search)
     // get state.search from redux-store --> to local const result
    const {results} = useSelector((state) => state.search);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${keyword}`);
            if(res.data.success){ //  res.status(200).send({ success: true, results }); from backend
                // global state.search change with new value from aplication  res.data.results
                dispatch(setResults(res.data.results))}
            // navigate to /search   
            navigate('/search')
        }catch(error){
            console.log(error);
            message.error("Something went wrong , Please provide any Input");
        }
    };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={keyword} onChange={(e) => {dispatch(setKeyword(e.target.value))}} />
        <button className="btn btn-success" type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchInput
