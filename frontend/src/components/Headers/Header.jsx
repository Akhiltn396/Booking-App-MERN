import React, { useState } from "react";
import "./Header.scss";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import AttractionsIcon from "@mui/icons-material/Attractions";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/searchSlice";
import { logOut } from "../redux/authSlice";
const Header = ({ list }) => {
  const navigate = useNavigate();

  const city = useSelector((state) => state.search.destination);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // console.log("ji",city);
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 1,
    room: 1,
  });


  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handleSubmit = () => {
    dispatch(update({ destination, dates, options }));
    navigate("/hotels", { state: { destination, dates, options } });
  };


  return (
    <div className="header">
      <div
        className={
          list !== "list" ? "headerContainer" : "headerContainer active"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <HotelIcon />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FlightIcon />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <DirectionsCarFilledIcon />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <AttractionsIcon />
            <span>Attractions</span>
          </div>
        </div>
        {list !== "list" && (
          <>
            <div className="header-elements">
              <h1 className="title">Need Discounts? Join Now</h1>
              <p className="desc">
                Get reward upto 50% on your travels.Unlock your reward by join.
              </p>
            </div>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <HotelIcon />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <CalendarMonthIcon />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {" "}
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
              </div>
              <div className="headerSearchItem">
                <PersonIcon />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult : ${options.children} children : ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSubmit}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Header;
