import React from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/authSlice";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user?.payload?.isAdmin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(user.payload);
  const handleLogin = () => {
    navigate("/login");
  };
  const handleClick = () => {
    // localStorage.removeItem("user");
    dispatch(logOut(user));
  };

  const handleHotel = () => {
    navigate("/admin");
  };
  return (
    <div className="navbars">
      <header className="header-section">
        <div className="top-nav">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 " >
                <ul className="tn-left ">
                  <Link to="./index.html">
                    <i>
                      <b style={{ fontSize: "30px", paddingRight: "5px" }}>
                        trivago
                      </b>
                    </i>
                  </Link>
                  <li>
                    <i className="fa fa-phone"></i> +91 7894784384
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i> info.trivago@gmail.com
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 " >
                <div className="tn-right">
                  <div className="top-social">
                    <Link to="#">
                      <FacebookIcon />
                    </Link>
                    <Link to="#">
                      <TwitterIcon />
                    </Link>
                    <Link to="#">
                      <YouTubeIcon />
                    </Link>
                    <Link to="#">
                      <InstagramIcon />
                    </Link>
                  </div>
                  {user?.payload?.isAdmin &&
                    <Link to="#" className="bk-btn" onClick={handleHotel}>
                        Create Hotel
                                      </Link>
                  }
                  {!user&&
                  <Link to="#" className="bk-btn" onClick={handleLogin}>
Login/Register
                  </Link>
}
                  <div className="language-option">

                    {user && (

                      <div>
                                            <img src="img/flag.jpg" alt="" />

                        <span>
                          {user?.payload?.username}{" "}
                          <i className="fa fa-angle-down"></i>
                        </span>

                        <div className="flag-dropdown">
                          <button onClick={handleClick} className="logout">Logout</button>
                        </div>
                      </div>
                    ) }
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

      </header>

<div>

</div>
    </div>
  );
};

export default Navbar;
