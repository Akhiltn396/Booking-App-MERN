import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../useFetch';
import LoadingSpinner from '../Spinner/Spinner';
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./HotelSigle.scss"
import Reserve from '../reserve/Reserve';

const HotelSingle = () => {

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

    console.log(options.room);
    const MilliSecondPerDay = 1000 * 60 * 60 * 24;

    const dayDifference = (dateStart, dateEnd) => {
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

    const handleClick = (e) => {
        e.preventDefault()
      if (user) {
        setOpenReserveCom(true);

      } else {
        navigate("/login");
      }
    };


  return (
    <div className='hotelSingle'>

{loading ? (
        <LoadingSpinner />
      ) : (
        <div>


        <i className="icon_menu"></i>




    <div className="breadcrumb-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb-text">
                        <h2>Our Rooms</h2>
                        <div className="bt-option">
                            <a href="./home.html">Home</a>
                            <span>Rooms</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section className="room-details-section spad">
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
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="room-details-item">
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
                        <div className="rd-text">
                            <div className="rd-title">
                                <h3>{data.hotelName}</h3>
                                <div className="rdt-right">
                                    <div className="rating">
                                        <i className="icon_star"></i>
                                        <i className="icon_star"></i>
                                        <i className="icon_star"></i>
                                        <i className="icon_star"></i>
                                        <i className="icon_star-half_alt"></i>
                                    </div>
                                    <a href="#" onClick={handleClick}>Booking Now</a>
                                </div>
                            </div>
                            <h2>Rs.{data.cheapestPrice}<span>/Pernight</span></h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="r-o">Distance:</td>
                                        <td>{data.distance}</td>
                                    </tr>
                                    <tr>
                                        <td className="r-o">City:</td>
                                        <td>{data.city}</td>
                                    </tr>
                                    <tr>
                                        <td className="r-o">Description:</td>
                                        <td>{data.desc}</td>
                                    </tr>
                                    <tr>
                                        <td className="r-o">Services:</td>
                                        <td>Wifi, Television, Bathroom,...</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="f-para">Motorhome or Trailer that is the question for you. Here are some of the
                                advantages and disadvantages of both, so you will be confident when purchasing an RV.
                                When comparing Rvs, a motorhome or a travel trailer, should you buy a motorhome or fifth
                                wheeler? The advantages and disadvantages of both are studied so that you can make your
                                choice wisely when purchasing an RV. Possessing a motorhome or fifth wheel is an
                                achievement of a lifetime. It can be similar to sojourning with your residence as you
                                search the various sites of our great land, America.</p>
                            <p>The two commonly known recreational vehicle classNamees are the motorized and towable.
                                Towable rvs are the travel trailers and the fifth wheel. The rv travel trailer or fifth
                                wheel has the attraction of getting towed by a pickup or a car, thus giving the
                                adaptability of possessing transportation for you when you are parked at your campsite.
                            </p>
                        </div>
                    </div>
                    <div className="rd-reviews">
                        <h4>Reviews</h4>
                        <div className="review-item">
                            <div className="ri-pic">
                                <img src="img/room/avatar/avatar-1.jpg" alt=""/>
                            </div>
                            <div className="ri-text">
                                <span>27 Aug 2019</span>
                                <div className="rating">
                                    <i className="icon_star"></i>
                                    <i className="icon_star"></i>
                                    <i className="icon_star"></i>
                                    <i className="icon_star"></i>
                                    <i className="icon_star-half_alt"></i>
                                </div>
                                <h5>Brandon Kelley</h5>
                                <p>Neque porro qui squam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                                    adipisci velit, sed quia non numquam eius modi tempora. incidunt ut labore et dolore
                                    magnam.</p>
                            </div>
                        </div>
                        <div className="review-item">
                            <div className="ri-pic">
                                <img src="img/room/avatar/avatar-2.jpg" alt=""/>
                            </div>
                            <div className="ri-text">
                                <span>27 Aug 2019</span>
                                <div className="rating">
                                    <i className="icon_star"></i>
                                    <i className="icon_star"></i>
                                    <i className="icon_star"></i>
                                    <i className="icon_star"></i>
                                    <i className="icon_star-half_alt"></i>
                                </div>
                                <h5>Brandon Kelley</h5>
                                <p>Neque porro qui squam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                                    adipisci velit, sed quia non numquam eius modi tempora. incidunt ut labore et dolore
                                    magnam.</p>
                            </div>
                        </div>
                    </div>
                    <div className="review-add">
                        <h4>Add Review</h4>
                        <form action="#" className="ra-form">
                            <div className="row">
                                <div className="col-lg-6">
                                    <input type="text" placeholder="Name*"/>
                                </div>
                                <div className="col-lg-6">
                                    <input type="text" placeholder="Email*"/>
                                </div>
                                <div className="col-lg-12">
                                    <div>
                                        <h5>You Rating:</h5>
                                        <div className="rating">
                                            <i className="icon_star"></i>
                                            <i className="icon_star"></i>
                                            <i className="icon_star"></i>
                                            <i className="icon_star"></i>
                                            <i className="icon_star-half_alt"></i>
                                        </div>
                                    </div>
                                    <textarea placeholder="Your Review"></textarea>
                                    <button type="submit">Submit Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="room-booking">
                        <h3>Your Reservation</h3>
                        <form action="#">
                        <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.hotelName}</h1>
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

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="search-close-switch"><i className="icon_close"></i></div>
            <form className="search-model-form">
                <input type="text" id="search-input" placeholder="Search here....."/>
            </form>
        </div>
    </div>
    </div>
      )}
{openReserveCom && (
        <Reserve setOpen={setOpenReserveCom} totalAmt={totalAmt} />
      )}


    </div>
  )
}

export default HotelSingle
