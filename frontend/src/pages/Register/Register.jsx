import React, { useEffect, useState } from "react";
import "./Register.css";
import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import { object, string, number, date, InferType } from "yup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

const Register = () => {
  const [credentials, setCredentials] = useState([
    {
      username: undefined,
      email: undefined,
      phone: undefined,
      city: undefined,
      country: undefined,
      password: undefined,
    },
  ]);
  console.log(credentials);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));


  };

  const registerSchema = yup.object().shape({
    username:yup.string().min(4).max(12).required("Please enter fullname"),
    email:yup.string().email().required("Please enter email"),
    phone: yup.string().min(4).max(12).required("Please enter phone number"),
    city: yup.string().required("Please enter city"),
    country: yup.string().required("Please enter country"),
    password:yup.string().min(4).max(12).required("Please enter password"),
  });

  const submitForm = (values) => {
    console.log(values);
  };
  const {handleSubmit, register, formState:{errors}} = useForm({
    resolver:yupResolver(registerSchema),
  });



  const handlePost = async () => {
    try {
      const { username, email, phone, city, country, password } = credentials;

      const res = await axios
        .post("http://localhost:3003/api/auth/register", {
          username,
          email,
          phone,
          city,
          country,
          password,
        })
        .then(function (response) {
          console.log(response);

          navigate("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <Formik
    //   initialValues={credentials}
    //   validationSchema={registerSchema}
    //   onSubmit={submitForm}
    // >
      <div className="Register">
        <form onSubmit={handleSubmit((d) => console.log(d))}>
          <MDBContainer className="my-4   ltop">
            <MDBCard>
              <MDBRow className="g-0">
                <MDBCol>
                  <MDBCardImage
                    src="https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=1600"
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
                      Signup into your account
                    </h5>
                    <input
                      {...register("username")}
                      onChange={handleChange}
                      id="username"
                      placeholder="Enter username"
                    />
                          <p className="error-text">{errors.username?.message}</p>

                    <input
                      {...register("email")}
                      onChange={handleChange}
                      id="email"
                      placeholder="Enter email"
                      type="email"

                    />
                           <p className="error-text">{errors.email?.message}</p>

                    <input
                      {...register("phone")}
                      onChange={handleChange}
                      id="phone"
                      placeholder="Enter phone number"
                      type="number"

                    />
                           <p className="error-text">{errors.phone?.message}</p>

                    <input
                      {...register("city")}
                      onChange={handleChange}
                      id="city"
                      placeholder="Enter city"

                    />
                           <p className="error-text">{errors.city?.message}</p>

                    <input
                      {...register("country")}
                      onChange={handleChange}
                      id="country"
                      placeholder="Enter country"

                    />
                           <p className="error-text">{errors.country?.message}</p>


                    <input
                      {...register("password")}
                      onChange={handleChange}
                      id="password"
                      placeholder="Enter password"

                    />
                           <p className="error-text">{errors.password?.message}</p>

                    <MDBBtn
                      type="submit"
                      className="mb-4 px-5"
                      color="dark"
                      size="lg"
                      // disabled={loading} type="submit" disabled={isSubmitting}
                      onClick={handlePost}
                    >
                      Register
                    </MDBBtn>

                    {}
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                      Already have an account?{" "}
                      <Link to={"/login"} style={{ color: "#393f81" }}>
                        LogIn here
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
        </form>
      </div>
    // </Formik>
  );
};

export default Register;
