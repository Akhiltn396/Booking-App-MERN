import React, { useEffect, hoteleducer, useState } from "react";
import "./AddHotel.scss";
// import upload from "../../utils/upload";
// import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateHotel, updateHotelImg } from "../redux/hotelSlice";
import upload from "../utils/upload";
import newRequest from "../utils/newRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { setDayOfYear } from "date-fns";
import Reserve from "../reserve/Reserve";
import Success from "../Success/Success";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const AddHotel = () => {
  const [hotel, setHotel] = useState({
    hotelName: undefined,
    type: undefined,
    city: undefined,
    address: undefined,
    distance: undefined,
    desc: undefined,
    cheapestPrice: undefined,
  });

  const [popup, setPopup] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const hh = useSelector((state) => state);

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    hotelName: yup.string().required("Please enter your hotel name"),
    type: yup.string().required("Please enter the type of your residency"),
    city: yup.string().required("Please enter the city"),
    address: yup.string().min(4).max(40).required("Please enter the address"),
    images: yup.string().required("Please enter the images"),
    distance: yup.number().required("Please enter the distance from your city"),
    title: yup.string().min(4).max(1000).required("Please enter some title about your hotel"),
    desc: yup.string().required("Please enter some descriptions about your residency"),
    cheapestPrice: yup.number().required("Please enter the cheapest price"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setHotel({ ...hotel, [name]: value });
  };

  // const handleFeature = (e) => {
  //   //     e.preventDefault();
  //   //     dispatch({
  //   //       type: "ADD_FEATURE",
  //   //       payload: e.target[0].value,
  //   //     });
  //   //     e.target[0].value = "";
  // };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const images = await Promise.all(
        [...photos].map(async (file) => {
          //[...photos is using because multiples files are stored as a file list in js.inorder to convert them into an array we can use this ]
          const url = await upload(file);
          return url;
        })
      );
      setPhotos(images);

      setUploading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleHotel = async (data) => {
    try {
      const res = newRequest
        .post(
          "/hotels/",
          { ...hotel, photos },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          console.log(response);
          setPopup(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="add">
      <form onSubmit={handleSubmit(handleHotel)}>
        {" "}
        <div className="container">
          <h1>Add New Hotel</h1>
          <div className="sections">
            <div className="info">
              <label htmlFor="">Hotel Name</label>
              <input
                {...register("hotelName")}
                type="text"
                placeholder="e.g. I will do something I'm really good at"
                onChange={handleChange}
                id="hotelName"

              />
              <p className="error-data">{errors.hotelName?.message}</p>

              <label htmlFor="">Type</label>
              <select {...register("type")} id="cat" onChange={handleChange}>
                <option value="hotel">Hotel</option>
                <option value="appartment">Appartment</option>
                <option value="resorts">Resorts</option>
                <option value="villas">Villas</option>
                <option value="cabins">Cabins</option>
              </select>

              <p className="error-data">{errors.type?.message}</p>

              <label htmlFor="">City</label>
              <input
                type="text"
                {...register("city")}
                onChange={handleChange}
              />
              <p className="error-data">{errors.city?.message}</p>

              <label htmlFor="">Distance</label>
              <input
                type="number"
                {...register("distance")}
                onChange={handleChange}

              />
              <p className="error-data">{errors.distance?.message}</p>

              <label htmlFor="">Title</label>
              <input
                type="text"
                {...register("title")}
                onChange={handleChange}
              />
              <p className="error-data">{errors.title?.message}</p>

              <label htmlFor="">Hotel Desc</label>
              <textarea
                {...register("desc")}
                id=""
                cols="15"
                rows="10"
                onChange={handleChange}
              ></textarea>
              <p className="error-data">{errors.desc?.message}</p>

              <label htmlFor="">Address</label>
              <textarea
                {...register("address")}
                id=""
                cols="15"
                rows="10"
                onChange={handleChange}
              ></textarea>

              <p className="error-data">{errors.address?.message}</p>

              <div className="images">
                <div className="imagesInputs">
                  <label htmlFor="">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    {...register("images")}
                    onChange={(e) => setPhotos(e.target.files)}
                  />
                </div>
                <p className="error-data">{errors.images?.message}</p>

                <button onClick={handleUpload}>
                  {uploading ? "uploading" : "Upload"}
                </button>
              </div>
              <label htmlFor="">cheapestPrice</label>
              <input
                type="text"
                {...register("cheapestPrice")}
                onChange={handleChange}
              />
              <p className="error-data">{errors.cheapestPrice?.message}</p>

              <button>Create</button>
            </div>
            <div className="details">
              <div className="addedFeatures">
                {/* {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    // onClick={() =>
                    //   dispatch({ type: "REMOVE_FEATURE", payload: f })
                    // }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))} */}
              </div>
            </div>
            {popup && <Success item="hotel"/>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
