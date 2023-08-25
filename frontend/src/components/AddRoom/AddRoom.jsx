import React, { useEffect, roomeducer, useState } from "react";
import "./AddRoom.scss";
// import upload from "../../utils/upload";
// import newRequest from "../../utils/newRequest";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import upload from "../utils/upload";
import newRequest from "../utils/newRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { setDayOfYear } from "date-fns";
import Reserve from "../reserve/Reserve";
import Success from "../Success/Success";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useFetch from '../useFetch';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const AddRoom = () => {
  const [room, setRoom] = useState({
    title: undefined,
    price: undefined,
    maxPeople: undefined,
    desc: undefined,

  });


  const location = useLocation()

  const [hotel, setHotel] = useState(location.state.data.data);

  const hotelid = hotel._id
  const {data,loading,error,reFetch} = useFetch(`http://localhost:3003/api/rooms/rooms/${hotelid}`)
  console.log(data);


  const id = useParams();

  const hotelId = id.id
  const [popup, setPopup] = useState(false);


  const [uploading, setUploading] = useState(false);
  const hh = useSelector((state) => state);

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    title: yup.string().required("Please enter your the title of the room"),
    price: yup.number().required("Please enter the price"),
    maxPeople: yup.number().required("Please enter the maximum peoples"),
    desc: yup.string().min(4).max(40).required("Please enter the description"),

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

    setRoom({ ...room, [name]: value });
  };


  // const handleFeature = (e) => {
  //   //     e.preventDefault();
  //   //     dispatch({
  //   //       type: "ADD_FEATURE",
  //   //       payload: e.target[0].value,
  //   //     });
  //   //     e.target[0].value = "";
  // };


  const handleRoom = async (data) => {
    try {
      const res = newRequest
        .post(
          `/rooms/${hotelId}`,
          { ...room },
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
      <form onSubmit={handleSubmit(handleRoom)}>
        {" "}
        <div className="container">
          <h1>Add New Room</h1>
          <div className="sections">
            <div className="info">
              <label htmlFor="">Room Name</label>
              <input
                {...register("title")}
                type="text"
                placeholder="e.g. I will do something I'm really good at"
                onChange={handleChange}
                id="title"

              />
              <p className="error-data">{errors.title?.message}</p>



              <label htmlFor="">Price</label>
              <input
                type="number"
                {...register("price")}
                onChange={handleChange}
              />
                            <p className="error-data">{errors.price?.message}</p>


              <label htmlFor="">Maximum Peoples allowed</label>
              <input
                type="number"
                {...register("maxPeople")}
                onChange={handleChange}

              />
              <p className="error-data">{errors.maxPeople?.message}</p>

              <label htmlFor="">Description</label>
              <input
                type="text"
                {...register("desc")}
                onChange={handleChange}
              />
              <p className="error-data">{errors.description?.message}</p>






              <button>Create Room</button>
            </div>
            <div className="details">
            <h1>Your  Rooms</h1>
            <hr />

            {
              data.map((datas)=>(


                <Card style={{ width: '14rem' }} className="cards">

      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body >
        <Card.Title>{datas.title}</Card.Title>
        <Card.Text>
         {datas.desc}
        </Card.Text>
        <Card.Text>
          {datas.price}
        </Card.Text>
        <Button variant="primary" >Edit</Button>
      </Card.Body>

    </Card>
            ))
            }



            <div className='admin'>
<div>


    <div>
        {/* {
            data.map((datas)=>(
                <AdminSub data={datas} key={datas.id} />
            ))
        } */}

    </div>
</div>
    </div>
            </div>
            {popup && <Success item="room"/>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
