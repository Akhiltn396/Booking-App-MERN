import { format } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../useFetch";
import './Hotels.scss'

const Hotels = () => {
  const location = useLocation();
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState(location.state.dates);

  const [options, setOptions] = useState(location.state.options);
  const [destination, setDestination] = useState(location.state.destination);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [city, setCity] = useState(destination);


  const {data,loading,error,reFetch} = useFetch(`http://localhost:3003/api/hotels?city=${city}&min=${min || 0}&max=${max || 1000}`)

  const handleClick = () =>{
reFetch()
  }
  return (
    <div className="hotels">
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listTitle">Search</h1>
            <div className="listItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="listItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()} //minDate is used for we cant select the previous day from today.means if its is 20 we cant select the previos days and months
                  ranges={dates}
                />
              )}
            </div>
            <div className="listItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="searchItem">
            <div className="offcanvas-menu-overlay"></div>
            <div className="canvas-open">
              <i className="icon_menu"></i>
            </div>
          </div>


        </div>


        <section className="rooms-section spad">
        {

!data.length<1?
  data.map((datas)=>(
          <div className="container">
            <div className="row">
              <div className="row-lg-4 row-md-6">
                <div className="room-item">
                  <img src={datas.photos[0]} alt="" className="data-img"/>
                  <div className="ri-text">
                    <h4>{datas.hotelName}</h4>
                    <h3>
                      Rs.{datas.cheapestPrice}<span>/Pernight</span>
                    </h3>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">{city&& 'Distance from'} {city}:</td>
                          <td>{city&&datas.distance + 'm'} </td>
                        </tr>
                        <tr>
                          <td className="r-o">Type:</td>
                          <td>{datas.type}</td>
                        </tr>
                        <tr>
                          <td className="r-o">Description</td>
                          <td>{data.desc}</td>
                        </tr>
                        <tr>
                          <td className="r-o">Services:</td>
                          <td>Wifi, Television, Bathroom,...</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link to={`${datas._id}`} className="primary-btn">
                      See availability
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
            ))
            :
            <h1 style={{width:"200vh"}}>Oops...no data found</h1>
        }
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
    </div>
  );
};

export default Hotels;
