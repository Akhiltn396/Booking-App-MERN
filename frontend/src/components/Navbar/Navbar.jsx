import React from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  // console.log(user.payload);
  const handleLogin = () => {
    navigate("/login");
  };
  const handleClick = () => {
    // localStorage.removeItem("user");
    dispatch(logOut(user));
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <span className="logo">
            triago <span style={{ fontWeight: 800 }}>Booking</span>
          </span>
        </Link>

        <div className="navItems">
          <div className="items">
            <div>Become a member</div>
            <div>Triago for business</div>
            <div>Call +91 7367883388 for booking</div>
          </div>
          <div className="buttondiv">
            {user ? (
              <div>{user?.payload?.username}</div>
            ) : (
              <div className="btn">
                <button className="register">Register</button>
                <button className="login" onClick={handleLogin}>
                  Login
                </button>
              </div>
            )}
          </div>
          <div className="logOutItem">
          {user && (
            <button className="LogoutBtn" onClick={handleClick}>
              Logout
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
