import React, { useEffect, useReducer, useState } from "react";
import "./AddHotel.scss";
// import upload from "../../utils/upload";
// import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateHotel, updateHotelImg } from "../redux/hotelSlice";
import upload from "../utils/upload";

const AddHotel = () => {
  const [user,setUser] = useState({
    hotelName:"",
    type:"",
    city:"",
    desc:"",
    cheapestPrice:""
  })

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const hh = useSelector((state)=>state)
  console.log(hh);


  const dispatch = useDispatch()


   const handleChange = (e) => {
   const {name,value} = e.target;
  //  console.log(name);


   setUser({...user,[name]:value})
   console.log(user.hotelName);
        dispatch(updateHotel(user))
        // dispatch(updateHotel([e.target.name="city"]=e.target.value))
        // dispatch(updateHotel([e.target.name="desc"]=e.target.value))
   };



   const handleFeature = (e) => {
//     e.preventDefault();
//     dispatch({
//       type: "ADD_FEATURE",
//       payload: e.target[0].value,
//     });
//     e.target[0].value = "";
   };

 const handleUpload = async () => {
    setUploading(true);
    try {

      const images = await Promise.all(
        [...files].map(async (file) => {  //[...files is using because multiples files are stored as a file list in js.inorder to convert them into an array we can use this ]
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);

      dispatch(updateHotelImg(images))
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: (gig) => {
//       return newRequest.post("/gigs", gig);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["myGigs"]);
//     },
//   });

//   const handleSubmit = (e) => {
//     // e.preventDefault();
//     // mutation.mutate(state);
// useEffect(() => {
//       return newRequest.post("/hotels/", gig);



// }, [])


  //   //  navigate("/mygigs")
  // };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Hotel</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Hotel Name</label>
            <input
              type="text"
              name="hotelName"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Type</label>
            <select name="type" id="cat" onChange={handleChange}>
              <option value="hotel">Hotel</option>
              <option value="appartment">Appartment</option>
              <option value="resorts">Resorts</option>
              <option value="villas">Villas</option>
              <option value="cabins">Cabins</option>
            </select>

            <label htmlFor="">City</label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
            />
             <label htmlFor="">Hotel Desc</label>
           <textarea name="desc" id="" cols="15" rows="10" onChange={handleChange}></textarea>

            <div className="images">
              <div className="imagesInputs">

                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  name="images"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">cheapestPrice</label>
            <input
              type="text"
              name="cheapestPrice"
              onChange={handleChange}
            />
            {/* <button onClick={handleSubmit}>Create</button> */}
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
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
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="cheapestPrice" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotel;