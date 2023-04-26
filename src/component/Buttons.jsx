import React from 'react'
import Button from 'react-bootstrap/Button';
import { AiOutlineStar, AiFillStar, AiOutlineShareAlt } from "react-icons/ai";
import { useNavigate } from 'react-router-dom/dist';
const L_r_button = ({ data, Where_to, is_blank, to_call }) => {
    const navigate = useNavigate();
    // console.log(Where_to)
    return (
        <div className="button">
            <Button variant='primary' className="button-left" onClick={() => !is_blank && navigate(Where_to)} >{data}</Button>
        </div>

    )
}
export default React.memo(L_r_button);
