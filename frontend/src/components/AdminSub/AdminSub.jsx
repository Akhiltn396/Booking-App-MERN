import React, { useEffect, useState } from "react";
import "./AdminSub.scss";
import newRequest from "../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";


const AdminSub = (data) => {


  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    navigate(`/admin/${data.data._id}`, { state: { data } });

  };
  return (
    <div className="cards">
      <div>
        <div className="container">
          <img
            src={data?.data?.photos[0]}
            alt="Avatar"
            className="card-img"
            style={{ width: "15%" }}
          />

          <h4>
            <b>{data.data.hotelName}</b>
          </h4>
          <p>{data.data.type}</p>
          <p>{data.data.address}</p>
          <div className="newBtn">
            <button className="editBtn">Edit</button>
            <button className="deleteBtn">Delete</button>
            <button className="roomBtn" onClick={handleSubmit}>
              Add rooms
            </button>



          </div>

        </div>
      </div>


    </div>
  );
};

export default AdminSub;
