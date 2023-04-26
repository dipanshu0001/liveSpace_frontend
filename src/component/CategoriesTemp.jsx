import React,{memo} from 'react'
import '../css/CategoriesTemp.css'

function CategoriesTemp({ data: { img, type, listing,id } }) {

    return (
        <div className='cat-main'>
            <a href={`categories/${type }`} target="_blank">
                <div className="cat-img">
                    <img src={img} className="cat-img" />

                </div>
                <div className="cat-detail">
                    <p className="small-heading">{type}</p>
                    <p className="grey-text">{listing} Listing</p>
                </div>
            </a>

        </div>
    )
}

export default memo(CategoriesTemp)