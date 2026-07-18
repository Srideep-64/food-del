import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';
const List = ({url, setEditData }) => {
  
  const [list,setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const fetchList = async()=>{
    const response = await axios.get(`${url}/api/food/list`);
    
    
    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }
  const removeFood = async(foodId)=>{
      const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
      await fetchList();
      if(response.data.success){
        toast.success(response.data.message)
      }
      else{
        toast.error("Error");
      }
  }
  useEffect(()=>{
    fetchList();
  },[])
  useEffect(() => {
  if (selectedCategory === "All") {
    setFilteredList(list);
  } else {
    const filtered = list.filter(
      (item) => item.category === selectedCategory
    );
    setFilteredList(filtered);
  }
}, [selectedCategory, list]);
  return (
    <div className='list add flex-col'>
      <p>All Foods list</p>
      <select className='filter'
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="All">All</option>
  <option value="Salad">Salad</option>
  <option value="Rolls">Rolls</option>
  <option value="Deserts">Deserts</option>
  <option value="Sandwich">Sandwich</option>
  <option value="Cake">Cake</option>
  <option value="Pure Veg">Pure Veg</option>
  <option value="Pasta">Pasta</option>
  <option value="Noodles">Noodles</option>
</select>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Edit</b>
          <b>Remove</b>
        </div>
        {filteredList.map((item,index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() =>{ setEditData(item); navigate('/add'); }} className='cursor'>Edit</p>
              <p onClick={()=>removeFood(item._id)}className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
