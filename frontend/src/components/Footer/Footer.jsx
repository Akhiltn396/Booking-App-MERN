import React from 'react'
import "./Footer.scss"
import Download from "../../assets/pngegg (9).png"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer = () => {
  return (
    <div className='footer'>
<div className="footerdiv">
  <div className="header-footer">

    <h1>triago </h1>
    <h2 >World's leading chain of hotel and homes</h2>

<br />

   <h2>Join our network and grow your business!</h2>
    <button>List your property</button>


  </div>
  <div className='line'></div>
<div className='details'>
  <div className='download'>
    <p>Download triago for exciting offers</p>
<img src={Download} alt="" />
  </div>
  {/* <div className='line'></div> */}

<div className='first-detail'>
<p>About Us</p>
<p>Teams / Careers</p>
<p>Blogs</p>
<p>Support</p>
<p>Official triago Blog</p>
<p>Investor Relations</p>
<p>triago Circle</p>
<p>triago Frames</p>

</div>
<div className='line2'></div>

<div className='second-detail'>
<p>Terms and conditions</p>
<p>Guest policies</p>
<p>Privacy policy</p>
<p>Trust and Safety</p>
<p>Cyber Security</p>
<p>Cyber security awareness</p>
<p>Responsible disclosure</p>
<p>Advertise your homes</p>
</div>

</div>
<div className="line"></div>
<div className='social-media'>
  <FacebookIcon/>
  <InstagramIcon />
  <YouTubeIcon />
  <TwitterIcon />
  <PinterestIcon/>
  </div>
    </div>
    </div>
  )
}

export default Footer
