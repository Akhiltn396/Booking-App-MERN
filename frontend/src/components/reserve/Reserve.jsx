import { useSelector } from "react-redux";
import "./Reserve.css";
import CloseIcon from "@mui/icons-material/Close";

const Reserve = ({ setOpen, totalAmt }) => {

    const {user} = useSelector(state=>state.auth)
  return (
    <div className="reserve">
      <div className="rContainer">
        <CloseIcon className="rClose" onClick={() => setOpen(false)} />
        <div className="rButtons">
            <h3 style={{color:"white",textAlign:"center"}}>Heyy, {user?.payload?.username}</h3>
          <button className="button">Reserve now</button>

            <div className="amt">
            ₹ {totalAmt}
            </div>
          <button className="button">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
