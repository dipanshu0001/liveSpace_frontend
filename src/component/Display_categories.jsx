import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "../css/Display_categories.css"
import Button from 'react-bootstrap/Button';
import backgroundImage from '../images/agent-bg.jpg'
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import Agenttemplate from './Agenttemplate'
import { data } from '../databse/checkbox-details.js'
import axios from 'axios'
import Footer from './Footer';




function Display_categories() {
  const { category } = useParams()
  const checkBox = ["House", "Appartment", "Duplex", "Villa"]
  const [displayData, setData] = useState([]);
  const [filteroptions, setOptions] = useState({
    Type:category===""?[]:[category],
    maxPrice: "",
    minPrice: "",
    sort: "asc",
    RentalPeriod: "Both"
  });
  const [isbar, setBar] = useState(false);



  const Applyhandel = async () => {
    const { Type, minPrice, maxPrice, sort, RentalPeriod } = filteroptions
    try {
      const result = await axios.get(`http://localhost:4000/Categories/FilteredData`, {
        params: {
          Type: Type.join(','),
          maxPrice: maxPrice,
          minPrice: minPrice,
          sort: sort,
          RentalPeriod: RentalPeriod
        }
      })
      // setOptions(prev=>({
      //   Type: [],
      //   maxPrice: "",
      //   minPrice: "",
      //   sort: "asc",
      //   RentalPeriod: "Both"
      // }))
      console.log(result.data);
      setData(prev => result.data)
    } catch (e) {
      console.log(e.message)
    }
  }
  // const handleclear=async()=>{
  //   const { Type, minPrice, maxPrice, sort, RentalPeriod } = filteroptions
  //   try {
  //     const result = await axios.get(`http://localhost:4000/Categories/FilteredData`, {
  //       params: {
  //         Type: [],
  //         maxPrice: "",
  //         minPrice: "",
  //         sort: "asc",
  //         RentalPeriod: "Both"
  //       }
  //     })
  //     // setOptions(prev=>({
  //     //   Type: [],
  //     //   maxPrice: "",
  //     //   minPrice: "",
  //     //   sort: "asc",
  //     //   RentalPeriod: "Both"
  //     // }))
  //     console.log(result.data);
  //     setData(prev => result.data)
  //   } catch (e) {
  //     console.log(e.message)
  //   }
  // }
  const handelChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      setOptions(prev => ({ ...prev, Type: [...prev.Type, value] }))
    }
    else {
      setOptions(prev => ({ ...prev, Type: prev.Type.filter(val => val !== value) }))
    }
  }
  const handelPrice = e => {
    const { name, value } = e.target;
    setOptions(prev => ({ ...prev, [name]: value }))
  }
  const handelRentalPeriod = e => {
    const { name, checked, value } = e.target;
    if (checked) {

      setOptions(prev => ({ ...prev, [name]: value }))
    }
    else {
      setOptions(prev => ({ ...prev, [name]: "" }))

    }
  }
  const handlearrow = () => {
    setBar(prev => !prev)
  }
  useEffect(() => {
    const get_data = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Listings/LimitedDisplay`);
        setData(prev => [...response.data])
      } catch (e) { console.log(e.message) }
    }
    // get_data();
    Applyhandel();
    // console.log(displayData);
  }, [])

  return (
    <>

      <div className="categories-outer">
        <div className='img-outer'>
          <div className="img-div" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
          </div>
          <div className="content">
            <span>Categories</span>
            <ul>
              <li><a href="/"><AiOutlineHome size={20} className='changecolor' style={{ paddingBottom: "3px" }} /></a></li>
              <li>/</li>
              {/* <li><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></li> */}
              <li><span>{category ? category.toUpperCase() : "Categories"}</span></li>
            </ul>
          </div>
        </div>
        <div className="categories-main">
          <div className="filter-outer">
            {/* <div className="search">
                <input
                  placeholder='Search'
                />
                <div className="search-icon">
                  <AiOutlineSearch size={20} />
                </div>
              </div> */}
            <div className="filter-main">
              <div className="categories-display-type">
                <h5>Categories</h5>
                <ul>
                  {
                    data.map(ele => (
                      <li className="names" >
                        <input
                          type="checkbox"
                          name={ele}
                          value={ele}
                          // defaultChecked={e=>e.target.name===category}
                          onChange={handelChange}
                        // className='checkbox'
                        />
                        <label>{ele}</label>
                      </li>
                    ))
                  }
                </ul>

              </div>
              <div className="categories-display-price">
                <h5>Price Range</h5>
                <div className='range-css'>
                  <div>
                    <BiRupee size={20} />
                  </div>
                  <input type="text" placeholder="Minimum-Price" name="minPrice" value={filteroptions.minPrice} onChange={handelPrice} />
                </div>
                <div className='range-css'>
                  <div>
                    <BiRupee size={20} />
                  </div>
                  <input type="text" placeholder="Maximum-Price" name="maxPrice" value={filteroptions.maxPrice} onChange={handelPrice} />
                </div>
              </div>
              <div className="categories-display-rentalPeriod">
                <h5>RentalPeriod</h5>
                <div className='rent-css'>
                  <div className="radiobox">
                    <input type="radio" name="RentalPeriod" value="Monthly" onChange={handelRentalPeriod} />
                    <label>
                      Month
                    </label>
                  </div>
                  <div className='radiobox'>
                    <input type="radio" name="RentalPeriod" value="Yearly" onChange={handelRentalPeriod} />
                    <label>Year</label>
                  </div>
                  <div className='radiobox'>
                    <input type="radio" name="RentalPeriod" value="Both" onChange={handelRentalPeriod} />
                    <label>Both</label>
                  </div>
                </div>
                <div className='apply-filter'>
                  <div onClick={Applyhandel}><Button variant="info">Apply Filter</Button>{' '}</div>
                  <div><Button variant="warning">Clear Filter</Button>{' '}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="arrow" >
            {!isbar && (<div className='arrow-search'>
              {/* <div className="search"> */}
              {/* <input
                  placeholder='Search'
                />
                <div className="search-icon">
                  <AiOutlineSearch size={25} />
                </div> */}
              <BsArrowBarRight size={30} onClick={handlearrow} />
              {/* </div> */}
            </div>)}
            <div className={!isbar ? "secondary-div" : "secondary-show"}>
              <div className="search">
                <input
                  placeholder='Search'
                />
                <div className="search-icon">
                  <AiOutlineSearch size={30} />
                </div>
                <BsArrowBarLeft size={30} onClick={handlearrow} />
              </div>
              <div className="filter-main">
                <div className="categories-display-type">
                  <h5>Categories</h5>
                  <ul>
                    {
                      data.map(ele => (
                        <li className="names" >
                          <input
                            type="checkbox"
                            name={ele}
                            value={ele}
                            onChange={handelChange}
                          // className='checkbox'
                          />
                          <label>{ele}</label>
                        </li>
                      ))
                    }
                  </ul>

                </div>
                <div className="categories-display-price">
                  <h5>Price Range</h5>
                  <div className='range-css'>
                    <div>
                      <BiRupee size={20} />
                    </div>
                    <input type="text" placeholder="Minimum-Price" name="minPrice" value={filteroptions.minPrice} onChange={handelPrice} />
                  </div>
                  <div className='range-css'>
                    <div>
                      <BiRupee size={20} />
                    </div>
                    <input type="text" placeholder="Maximum-Price" name="maxPrice" value={filteroptions.maxPrice} onChange={handelPrice} />
                  </div>
                </div>
                <div className="categories-display-rentalPeriod">
                  <h5>RentalPeriod</h5>
                  <div className='rent-css'>
                    <div className="radiobox">
                      <input type="radio" name="RentalPeriod" value="Monthly" onChange={handelRentalPeriod} />
                      <label>
                        Month
                      </label>
                    </div>
                    <div className='radiobox'>
                      <input type="radio" name="RentalPeriod" value="Yearly" onChange={handelRentalPeriod} />
                      <label>Year</label>
                    </div>
                    <div className='radiobox'>
                      <input type="radio" name="RentalPeriod" checked value="Both" onChange={handelRentalPeriod} />
                      <label>Both</label>
                    </div>
                  </div>
                  <div className='apply-filter'>
                    <div onClick={Applyhandel}><Button variant="info">Apply Filter</Button>{' '}</div>
                    <div><Button variant="warning" >Clear Filter</Button>{' '}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            displayData.length !== 0 ? (<div className="categories-inner">
              <div className="products">
                {
                  displayData.map((ele, index) => (
                    <div style={{ width: "100%" }}>

                      <Agenttemplate agent={ele} key={index} isagent={true} is_blank={false} is_category={true} />
                    </div>
                  ))
                }
              </div>



            </div>) : (
              <>
                <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center" }}>
                  <div style={{ display: "block" }}>
                    <img src={require('../images/no-product.png')} />
                  </div>
                </div>
              </>
            )
          }
        </div>


      </div>


    </>
  )

}

export default Display_categories