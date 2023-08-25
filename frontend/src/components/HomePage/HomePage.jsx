import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "./HomePage.scss";
import { useDispatch } from "react-redux";
import { update } from "../redux/searchSlice";
import HotelIcon from "@mui/icons-material/Hotel";
import Carousel from 'react-bootstrap/Carousel';


import Hotel1 from '../../assets/100-pexels-pixabay-271624_1.jpg'
import Hotel2 from '../../assets/pexels-pixabay-271624 (1).jpg'


const HomePage = ({ user }) => {
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [slideNumber, setSlideNumber] = useState(0);


  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 1,
    room: 1,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  // const handleOption = (e) => {
  //  console.log(e.target.value);
  // };

  const handleSubmit = () => {
    dispatch(update({ destination, dates, options }));
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="homePage">
      {/* <div id="preloder">
        <div className="loader">
          <div className=""></div>
        </div>
      </div> */}
      {/* <div className="order"></div> */}

      <div style={{ display: 'block', width: "100%", padding:  "0px 40px "}} className="carousel">
      <Carousel>
        <Carousel.Item interval={10000}>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Image One"
            style={{height:"800px"}}
          />

        </Carousel.Item>
        <Carousel.Item interval={10000}>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/2844474/pexels-photo-2844474.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Image Two"
            style={{height:"800px"}}

          />

        </Carousel.Item>
        <Carousel.Item interval={10000}>
          <img
            className="d-block w-100"
src="https://images.pexels.com/photos/2057610/pexels-photo-2057610.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Image One"
            style={{height:"800px",objectFit:"cover"}}

          />

        </Carousel.Item>

      </Carousel>
    </div>

      <section className="hero-section">
        <div className="home">
        <div className="contains">
          <div className="row">
            <div className="col-lg-6">
              <div className="hero-text" >
                <h1 style={{ color: "white" }}>Trivago</h1>
                <p style={{ color: "white" }}>
                  Here are the best hotel booking sites, including
                  recommendations for international travel and for finding
                  low-priced hotel rooms.
                </p>
                <Link to="#" className="primary-btn">
                  Discover Now
                </Link>
              </div>
            </div>
            <div className="col-xl-3 col-lg-5 offset-xl-2 offset-lg-1">
              <div className="booking-form">
                <h3>Booking Your Hotel</h3>
                <div action="#">
                    <div>

                    <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
                    </div>

                  <p>CheckIn and CheckOut Dates</p>

                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className="headerSearchText"
                  >
                    {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                      dates[0].endDate,
                      "dd/MM/yyyy"
                    )}`}
                  </span>
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date"
                      minDate={new Date()} //minDate is used for we cant select the previous day from today.means if its is 20 we cant select the previos days and months
                    />
                  )}

                  <div className="guests">Guests:</div>

                  <div className="select-option">
                    <label htmlFor="guest"></label>
                    <select id="guest">
                      <option value="">2 Adults</option>
                      <option value="">3 Adults</option>
                      <option value="">4 Adults</option>
                    </select>
                  </div>
                  <div>Room:</div>
                  <div className="select-option">
                    <label htmlFor="room"></label>
                    <select id="room" >
                      <option value="">1 Room</option>
                      <option value="">2 Room</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="checkBtn"
                    onClick={handleSubmit}
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="hero-slider owl-carousel">
          <div
            className="hs-item set-bg"
            style={{
              backgroundImage: `url('img/hero/hero-2.jpg')`,
            }}
          ></div>
          <div
            className="hs-item set-bg"
            style={{
              backgroundImage: `url('img/hero/hero-2.jpg')`,
            }}
          ></div>
          <div
            className="hs-item set-bg"
            data-setbg="img/hero/hero-3.jpg"
          ></div>
        </div>
      </section>

      <section className="aboutus-section spad">
        <div className="contain1">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-text">
                <div className="section-title">
                  <span>About Us</span>
                  <h2>
                    Intercontinental LA <br />
                    Westlake Hotel
                  </h2>
                </div>
                <p className="f-para">
                  Trivago.com is a leading online accommodation site. We’re
                  passionate about travel. Every day, we inspire and reach
                  millions of travelers across 90 local websites in 41
                  languages.
                </p>
                <p className="s-para">
                  So when it comes to booking the perfect hotel, vacation
                  rental, resort, apartment, guest house, or tree house, we’ve
                  got you covered.
                </p>
                <Link to="#" className="primary-btn about-btn">
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-pic">
                <div className="row">
                  <div className="col-sm-6">
                    <img src="img/about/about-1.jpg" alt="" />
                  </div>
                  <div className="col-sm-6">
                    <img src="img/about/about-2.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section spad">
        <div className="contain">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>What We Do</span>
                <h2>Discover Our Services</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="service-item">
                <i className="flaticon-036-parking"></i>
                <h4>Travel Plan</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="service-item">
                <i className="flaticon-033-dinner"></i>
                <h4>Catering Service</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="service-item">
                <i className="flaticon-026-bed"></i>
                <h4>Babysitting</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="service-item">
                <i className="flaticon-024-towel"></i>
                <h4>Laundry</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="service-item">
                <i className="flaticon-044-clock-1"></i>
                <h4>Hire Driver</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="service-item">
                <i className="flaticon-012-cocktail"></i>
                <h4>Bar & Drink</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp-room-section">
        <div className="container-fluid">
          <div className="hp-room-items">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div
                  className="hp-room-item set-bg"
                  style={{
                    backgroundImage: `url('img/about/about-2.jpg')`,
                  }}
                >
                  <div className="hr-text">
                    <h3>Double Room</h3>
                    <h2>
                      199₹<span>/Pernight</span>
                    </h2>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">Size:</td>
                          <td>30 ft</td>
                        </tr>
                        <tr>
                          <td className="r-o">Capacity:</td>
                          <td>Max persion 5</td>
                        </tr>
                        <tr>
                          <td className="r-o">Bed:</td>
                          <td>King Beds</td>
                        </tr>
                        <tr>
                          <td className="r-o">Services:</td>
                          <td>Wifi, Television, Bathroom,...</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link to="#" className="primary-btn">
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="hp-room-item set-bg"
                  style={{
                    backgroundImage: `url('/img/room/room-b2.jpg')`,
                  }}
                >
                  <div className="hr-text">
                    <h3>Premium King Room</h3>
                    <h2>
                      159₹<span>/Pernight</span>
                    </h2>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">Size:</td>
                          <td>30 ft</td>
                        </tr>
                        <tr>
                          <td className="r-o">Capacity:</td>
                          <td>Max persion 5</td>
                        </tr>
                        <tr>
                          <td className="r-o">Bed:</td>
                          <td>King Beds</td>
                        </tr>
                        <tr>
                          <td className="r-o">Services:</td>
                          <td>Wifi, Television, Bathroom,...</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link to="#" className="primary-btn">
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="hp-room-item set-bg"
                  style={{
                    backgroundImage: `url('img/room/room-b3.jpg')`,
                  }}
                >
                  <div className="hr-text">
                    <h3>Deluxe Room</h3>
                    <h2>
                      198₹<span>/Pernight</span>
                    </h2>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">Size:</td>
                          <td>30 ft</td>
                        </tr>
                        <tr>
                          <td className="r-o">Capacity:</td>
                          <td>Max persion 5</td>
                        </tr>
                        <tr>
                          <td className="r-o">Bed:</td>
                          <td>King Beds</td>
                        </tr>
                        <tr>
                          <td className="r-o">Services:</td>
                          <td>Wifi, Television, Bathroom,...</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link to="#" className="primary-btn">
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="hp-room-item set-bg"
                  style={{
                    backgroundImage: `url('img/room/room-b4.jpg')`,
                  }}
                >
                  <div className="hr-text">
                    <h3>Family Room</h3>
                    <h2>
                      299₹<span>/Pernight</span>
                    </h2>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">Size:</td>
                          <td>30 ft</td>
                        </tr>
                        <tr>
                          <td className="r-o">Capacity:</td>
                          <td>Max persion 5</td>
                        </tr>
                        <tr>
                          <td className="r-o">Bed:</td>
                          <td>King Beds</td>
                        </tr>
                        <tr>
                          <td className="r-o">Services:</td>
                          <td>Wifi, Television, Bathroom,...</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link to="#" className="primary-btn">
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-section spad">
        <div className="contain">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Testimonials</span>
                <h2>What Customers Say?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="testimonial-slider owl-carousel">
                <div className="ts-item">
                  <p>
                    After a construction project took longer than expected, my
                    husband, my daughter and I needed a place to stay for a few
                    nights. As a Chicago resident, we know a lot about our city,
                    neighborhood and the types of housing options available and
                    absolutely love our vacation at Trivago Hotel.
                  </p>
                  <div className="ti-author">
                    <div className="rating">
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star-half_alt"></i>
                    </div>
                    <h5> - Alexander Vasquez</h5>
                  </div>
                  <img src="img/testimonial-logo.png" alt="" />
                </div>
                <div className="ts-item">
                  <p>
                    After a construction project took longer than expected, my
                    husband, my daughter and I needed a place to stay for a few
                    nights. As a Chicago resident, we know a lot about our city,
                    neighborhood and the types of housing options available and
                    absolutely love our vacation at Trivago Hotel.
                  </p>
                  <div className="ti-author">
                    <div className="rating">
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star"></i>
                      <i className="icon_star-half_alt"></i>
                    </div>
                    <h5> - Alexander Vasquez</h5>
                  </div>
                  <img src="img/testimonial-logo.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-section spad">
        <div className="contain">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Hotel News</span>
                <h2>Our Blog & Event</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div
                className="blog-item set-bg"
                style={{
                  backgroundImage: `url('img/blog/blog-1.jpg')`,
                }}
              >
                <div className="bi-text">
                  <span className="b-tag">Travel Trip</span>
                  <h4>
                    <Link to="#">Tremblant In Canada</Link>
                  </h4>
                  <div className="b-time">
                    <i className="icon_clock_alt"></i> 15th April, 2019
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="blog-item set-bg"
                style={{
                  backgroundImage: `url('img/blog/blog-2.jpg')`,
                }}
              >
                <div className="bi-text">
                  <span className="b-tag">Camping</span>
                  <h4>
                    <Link to="#">Choosing A Static Caravan</Link>
                  </h4>
                  <div className="b-time">
                    <i className="icon_clock_alt"></i> 15th April, 2019
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="blog-item set-bg"
                style={{
                  backgroundImage: `url('img/blog/blog-3.jpg')`,
                }}
              >
                <div className="bi-text">
                  <span className="b-tag">Event</span>
                  <h4>
                    <Link to="#">Copper Canyon</Link>
                  </h4>
                  <div className="b-time">
                    <i className="icon_clock_alt"></i> 21th April, 2019
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div
                className="blog-item small-size set-bg"
                style={{
                  backgroundImage: `url('img/blog/blog-wide.jpg')`,
                }}
              >
                <div className="bi-text">
                  <span className="b-tag">Event</span>
                  <h4>
                    <Link to="#">
                      Trip To Iqaluit In Nunavut A Canadian Arctic City
                    </Link>
                  </h4>
                  <div className="b-time">
                    <i className="icon_clock_alt"></i> 08th April, 2019
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="blog-item small-size set-bg"
                style={{
                  backgroundImage: `url('img/blog/blog-10.jpg')`,
                }}
              >
                <div className="bi-text">
                  <span className="b-tag">Travel</span>
                  <h4>
                    <Link to="#">Traveling To Barcelona</Link>
                  </h4>
                  <div className="b-time">
                    <i className="icon_clock_alt"></i> 12th April, 2019
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">
            <i className="icon_close"></i>
          </div>
          <form className="search-model-form">
            <input
              type="text"
              id="search-input"
              placeholder="Search here....."
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
