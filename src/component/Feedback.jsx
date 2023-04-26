import React, { useCallback, useEffect } from 'react'
import '../css/Feedback.css'
import { AiFillStar, AiOutlineLike, AiFillLike } from "react-icons/ai";

function Feedback({ breif_des, description, name, img, post, like }) {
    const [isliked, setLiked] = React.useState({
        total_liked: like,
        isliked: true
    })
    // const incLike=useCallback(( 
    // )=>(setLiked(prev=>({isliked:true,total_liked:prev.total_liked+1}))),[isliked.isliked])

    // const incLiked=( 
    //     )=>(setLiked(prev=>({isliked:true,total_liked:prev.total_liked+1})))
    // const decLike=useCallback(( 
    // )=>(setLiked(prev=>({isliked:false,total_liked:(prev.total_liked-1<0)?0:prev.total_liked-1}))),[isliked.isliked])
    useEffect(() => {
    }, [isliked.isliked, isliked.total_liked])


    return (
        // <div className="feedback_main">
        <div className="feedback_content">
            {/* <div className="feedback_content_middle"> */}
            <div className="feedback">
                <p>{breif_des}</p>
                <p>{description}</p>
                <div className="small-triangle"></div>
            </div>
            <div className="details">
                <div className="div">
                    {/* <div> */}
                    <img src={img} />
                    {/* </div> */}
                </div>

                <div className="personal-details">
                    <h5>{name}</h5>
                    <span>{post}</span>
                    {/* <div className="likes">
                        {isliked.isliked ? <AiOutlineLike onClick={() => (setLiked(prev => ({ isliked: !prev.isliked, total_liked: prev.total_liked + 1 })))} /> : (<><AiFillLike onClick={() => (setLiked(prev => ({ isliked: !prev.isliked, total_liked: ((prev.total_liked - 1) < 0) ? 0 : (prev.total_liked - 1) })))} /></>)}
                        <div>{isliked.total_liked}</div>
                    </div> */}
                </div>
            </div>

            {/* </div> */}
        </div>

        // </div>
    )
}

export default Feedback