import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'

const Add = ({url,editData,setEditData}) => {
    const isEdit=editData!==null;
    
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
      name:"",
      description:"",
      price:"",
      category:"Salad"

    })
    const navigate = useNavigate();
    useEffect(() => {
      if (editData) {
        setData({
          name: editData.name,
          description: editData.description,
          price: editData.price,
          category: editData.category
        });
      }
    }, [editData]);
    const onChangeHandler = (event) =>{
      const name = event.target.name;
      const value =event.target.value;
      setData(data => ({...data,[name]:value}))
    }
    const onsubmitHandler = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);

      if (image) {
        formData.append("image", image);
      }

      let response;

      if (isEdit) {
        formData.append("id", editData._id);
        response = await axios.post(`${url}/api/food/edit`, formData);
      } else {
        
        response = await axios.post(`${url}/api/food/add`, formData);
      }

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });
        setImage(false);
        setEditData(null); // exit edit mode
        toast.success(response.data.message);
        if(isEdit){
          navigate('/list');
        }
      } else {
        toast.error(response.data.message);
      }
    };
  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onsubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img 
              src={
                image 
                  ? URL.createObjectURL(image) 
                  : isEdit 
                    ? `${url}/images/${editData.image}` 
                    : assets.upload_area
              } 
              alt="" 
            />
          </label>
            <input 
            onChange={(e)=>setImage(e.target.files[0])}
            type="file"
            id='image'
            hidden
            required={!isEdit}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name </p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write description here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler}  name="category" value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20'/>
          </div>
        </div>
        <button type='submit' className='add-btn'>
          {isEdit ? "UPDATE" : "ADD"}
        </button>
      </form>
    </div>
  )
}

export default Add
