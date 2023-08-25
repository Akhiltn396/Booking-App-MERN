import React from 'react'
import "./Footer.scss"
import Download from "../../assets/pngegg (9).png"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (

    <div>
       <footer className="footer-section">
        <div className="container">
            <div className="footer-text">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ft-about">
                            <div className="logo">
                                <Link href="#">
                                    <h2 style={{color:"white"}}><i>trivago</i></h2>
                                </Link>
                            </div>
                            <p>We inspire and reach millions of travelers<br /> across 90 local websites</p>
                            <div className="fa-social">
                                <Link href="#"><i className="fa fa-facebook"></i></Link>
                                <Link href="#"><i className="fa fa-twitter"></i></Link>
                                <Link href="#"><i className="fa fa-tripadvisor"></i></Link>
                                <Link href="#"><i className="fa fa-instagram"></i></Link>
                                <Link href="#"><i className="fa fa-youtube-play"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 offset-lg-1">
                        <div className="ft-contact">
                            <h6>Contact Us</h6>
                            <ul>
                                <li>+91 7894784384</li>
                                <li>info.trivago@gmail.com</li>
                                <li>Gandhi Square,Mumbai 694367</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 offset-lg-1">
                        <div className="ft-newslatter">
                            <h6>New latest</h6>
                            <p>Get the latest updates and offers.</p>
                            <form action="#" className="fn-form">
                                <input type="text" placeholder="Email"/>
                                <button type="submit"><i className="fa fa-send"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright-option">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <ul>
                            <li><Link href="#">Contact</Link></li>
                            <li><Link href="#">Terms of use</Link></li>
                            <li><Link href="#">Privacy</Link></li>
                            <li><Link href="#">Environmental Policy</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-5">
                        <div className="co-text">
  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <Link href="https://colorlib.com" target="_blank">Colorlib</Link>
                    </div>
                </div>
            </div>
        </div>
        </div>

    </footer>
    </div>
//     <div className='footer'>
// <div className="footerdiv">
//   <div className="header-footer">

//     <h1>triago </h1>
//     <h2 >World's leading chain of hotel and homes</h2>

// <br />

//    <h2>Join our network and grow your business!</h2>
//     <button>List your property</button>


//   </div>
//   <div className='line'></div>
// <div className='details'>
//   <div className='download'>
//     <p>Download triago for exciting offers</p>
// <img src={Download} alt="" />
//   </div>
//   {/* <div className='line'></div> */}

// <div className='first-detail'>
// <p>About Us</p>
// <p>Teams / Careers</p>
// <p>Blogs</p>
// <p>Support</p>
// <p>Official triago Blog</p>
// <p>Investor Relations</p>
// <p>triago Circle</p>
// <p>triago Frames</p>

// </div>
// <div className='line2'></div>

// <div className='second-detail'>
// <p>Terms and conditions</p>
// <p>Guest policies</p>
// <p>Privacy policy</p>
// <p>Trust and Safety</p>
// <p>Cyber Security</p>
// <p>Cyber security awareness</p>
// <p>Responsible disclosure</p>
// <p>Advertise your homes</p>
// </div>

// </div>
// <div className="line"></div>
// <div className='social-media'>
//   <FacebookIcon/>
//   <InstagramIcon />
//   <YouTubeIcon />
//   <TwitterIcon />
//   <PinterestIcon/>
//   </div>
//     </div>
//     </div>
  )
}

export default Footer
