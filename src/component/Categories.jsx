import React,{memo} from 'react'
import { data1 } from '../databse/category'
import CategoriesTemp from './CategoriesTemp'
import  '../css/Categories.css'
import '../css/common.css'
import Heading from '../common_components/Heading'
import { useNavigate } from 'react-router-dom/dist'



function Categories() {
  const navigate=useNavigate();
  return (
    <div className="cat-d-main">
      <Heading small="Categories" large="Browse By Category"/>
      <div className="temp-d">
        {
          data1.map((ele, index) => {
            return <CategoriesTemp key={index} data={ele}/>
          })
        }
      </div>
    </div>
  )
}

export default memo(Categories)