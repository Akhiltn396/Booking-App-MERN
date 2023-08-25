import { useSelector } from "react-redux";
import "./Success.css";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Success = ({item}) => {

    const [open,setOpen] = useState(true)
const navigate = useNavigate()

    const handleClick = () =>{
        setOpen(!open);
        navigate("/")
    }


    const {user} = useSelector((state) => state.auth);
  return (
    <div className="success">
      <div className="rContainer">
        <CloseIcon className="rClose" onClick={handleClick} />
        <div className="rButtons">
            <h3 style={{color:"white",textAlign:"center"}}>Congrats {user?.payload?.username},You have succesfully created Your {item}</h3>
          <button className="button"></button>


        </div>
      </div>
    </div>
  );
};

export default Success;
