import React from 'react'
import "./Catcard.scss"
import { Link } from 'react-router-dom'

const Catcard = ({item}) => {
  // console.log(item.img);
    return (

    <Link to="/">

    <div className='catCard'>
    <img src={item.img} alt="hhh" />
    <span className='desc'>{item.desc}</span>
    <span className='title'>{item.title}</span>
    <div>Hello</div>
    </div>
    </Link>
  )
}

export default Catcard
