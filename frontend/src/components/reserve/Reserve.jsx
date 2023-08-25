import { useSelector } from "react-redux";
import "./Reserve.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Reserve = ({ setOpen, totalAmt }) => {


  const paymentHandler = async (e) => {
    const API_URL = 'http://localhost:3003/'

    e.preventDefault();
    const orderUrl = `${API_URL}api/payment/order/${totalAmt}`;
    const response = await axios.get(orderUrl);
    const { data } = response;
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      name: "",
      description: "Some Description",
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await axios.post(url, {})
         console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    };
    const {user} = useSelector(state=>state.auth)
  return (
    <div className="reserve">
      <div className="rContainer">
        <CloseIcon className="rClose" onClick={() => setOpen(false)} />
        <div className="Buttons">
            <h3 style={{color:"white",textAlign:"center"}}>Heyy, {user?.payload?.username}</h3>
          <button className="button">Reserve now</button>

            <div className="amt">
            ₹ {totalAmt}
            </div>
          <button className="button" onClick={paymentHandler}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
