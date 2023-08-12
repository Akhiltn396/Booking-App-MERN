import "./Hotel.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import ListMail from "../../components/ListMail/ListMail";
import Header from "../../components/Headers/Header";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../components/useFetch";
import LoadingSpinner from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openReserveCom, setOpenReserveCom] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:3003/api/hotels/single/${id}`
  );

  const { dates, options } = useSelector((state) => state.search);
  const { user } = useSelector((state) => state.auth);

  const MilliSecondPerDay = 1000 * 60 * 60 * 24;

  const dayDifference = (dateStart, dateEnd) => {
    console.log(dateEnd?.getTime());
    const timeDiff = Math.abs(dateEnd?.getTime() - dateStart?.getTime()); //Math.abs means if the value is -7 it converts it into 7
    const dayDiff = Math.ceil(timeDiff / MilliSecondPerDay); //Math.ceil means if the value is 1.20 it converts it into 2

    return dayDiff;
  };

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const totalAmt = days * data.cheapestPrice * options.room;

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenReserveCom(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Header list="list" />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <CloseIcon className="close" onClick={() => setOpen(false)} />
              <ArrowBackIosIcon
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <ArrowForwardIosIcon
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <LocationOnIcon />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over {data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc} </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  molestiae quisquam fuga unde architecto mollitia magnam
                  suscipit hic natus rem? Quibusdam earum aliquid similique sed
                  molestiae officia doloremque consequatur magnam.
                </span>
                <h2>
                  <b>Rs.{totalAmt}</b> ({days} nights) <h6>Including GST</h6>
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <ListMail />
        </div>
      )}
      {openReserveCom && (
        <Reserve setOpen={setOpenReserveCom} totalAmt={totalAmt} />
      )}
    </div>
  );
};

export default Hotel;
