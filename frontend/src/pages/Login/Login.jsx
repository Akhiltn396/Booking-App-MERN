import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import newRequest from "../../components/utils/newRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  loginError,
  loginStart,
  loginSuccess,
} from "../../components/redux/authSlice";
import { loginUser } from "../../components/redux/loginUser";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [dataset, setDataset] = useState("");
  const [errorData, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate("/");

  const { user, error, loading, message } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // loginStart(state);
    // try {
    //     const res = await newRequest.post("/auth/login",credentials)
    //     loginSuccess({state,payload:res.data})
    // } catch (error) {
    //     loginError(state)
    // }
    try {
      loginUser(credentials, dispatch);
    } catch (error) {
      console.log(error);
    }
  };
  const loginUser = async (credentials, dispatch) => {
    dispatch(loginStart(credentials));
    try {
      const username = credentials.username;
      const password = credentials.password;

      const res = await axios
        .post("http://localhost:3003/api/auth/login", { username, password }, {
        withCredentials: true})
        .then(function (response) {
          console.log("Login response",response);
          dispatch(loginSuccess({ payload: response.data.details }));
          navigate("/");
        })
        .catch(function (error) {
          // console.log(error);
          dispatch(loginError(error));
      setError(error);
        });
    } catch (error) {
      // setError(error);

    }
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user?.payload));
  }, [user?.payload]);

  console.log(errorData);
  return (
    <div className="Login">
      <MDBContainer className="my-4   ltop">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="4">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <span className="h1 fw-bold mb-0 brand-name">triago</span>
                </div>
                <h2>
                  <marquee>
                    <i className="lbook">
                      Your Booking Partner...Join now for Exciting Offers
                    </i>
                  </marquee>
                </h2>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your account
                </h5>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  id="username"
                  type="text"
                  size="lg"
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="password"
                  type="password"
                  size="lg"
                  onChange={handleChange}
                />

                <MDBBtn
                  className="mb-4 px-5"
                  color="dark"
                  size="lg"
                  onClick={handleLogin}
                  // disabled={loading}
                >
                  Login
                </MDBBtn>
                {errorData && (
                  <span
                    style={{
                      color: "red",
                      alignItems: "center",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    {message}
                  </span>
                )}

                {
                  <div class="line">
                    <a
                      className={
                        errorData
                          ? "small text-muted flipX"
                          : "small text-muted"
                      }
                      href="#!"
                      style={{ fontSize: "20px" }}
                    >
                      Forgot password?
                    </a>
                  </div>
                }
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <Link to={"/register"} style={{ color: "#393f81" }}>
                   Register here
                  </Link>
                </p>

                <div className="d-flex flex-row justify-content-start">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      );
    </div>
  );
};

export default Login;
