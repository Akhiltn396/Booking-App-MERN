import React from 'react'
import "./SubNavbar.scss"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const SubNavbar = () => {
  return (
    <div className='subnav'>
<div className='city'>Mumbai<KeyboardArrowDownIcon/></div>
<div className='city'>Delhi<KeyboardArrowDownIcon/></div>
<div className='city'>Kolkatha<KeyboardArrowDownIcon/></div>
<div className='city'>Kochi<KeyboardArrowDownIcon/></div>
<div className='city'>Bangalore<KeyboardArrowDownIcon/></div>
<div className='city'>Chennai<KeyboardArrowDownIcon/></div>
     </div>
  )
}

export default SubNavbar
