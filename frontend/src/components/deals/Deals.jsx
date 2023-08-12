import React from 'react'
import "./Deals.scss"
import FireImg from "../../assets/pngwing.com.png"
const Deals = () => {
  return (
    <div className='deals'>
        <div className='deal'>
    <img src={FireImg} alt="" />
    <div className='texts'>
    <h3 className='exc-deals'>Get access to exclusive deals</h3>
    <p className='best-deals'>Only the best deals reach your inbox</p>
    </div>
    </div>
    <div className='notify'>
    <label htmlFor="">Your email</label>
<input type="text" placeholder='eg: John@gmail.com'/>
<button>Notify Me</button>
       </div>

    </div>
  )
}

export default Deals
