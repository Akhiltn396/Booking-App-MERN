import React from "react";
import "./Home.scss";
import SubNavbar from "../../components/SubNavbar/SubNavbar";
import Header from "../../components/Headers/Header";
import { cards, indianImgs } from "../../data";
import Catcard from "../../components/CatCardd/Catcard";
import Slide from "../../components/Slide/Slide";
import Featured from "../../components/featured/Featured";
import Deals from "../../components/deals/Deals";
import PropertyList from "../../components/ListProperty/ListProperty";
import TrendingDest from "../../components/TrendingDest/TrendingDest";
import UniqueProperties from "../../components/uniqueProperties/UniqueProperties";
import ListMail from "../../components/ListMail/ListMail";
import { useSelector } from "react-redux";
import Admin from "../../components/Admin/Admin";
import HomePage from "../../components/HomePage/HomePage";
const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="home">
      {user?.payload?.isAdmin ? (
        <Admin />
      ) : (
        <div>
          <HomePage user={user} />
        </div>
        // <div>
        //   <Header />

        //   <SubNavbar />
        //   <br />
        //   <br />
        //   <div className="slide">
        //     <Slide slidesToShow={5} arrowsScroll={1}>
        //       {cards.map((card) => (
        //         <Catcard key={card.id} item={card} />
        //       ))}
        //     </Slide>
        //   </div>

        //   <br />
        //   <br />

        //   <Deals />

        //   <div className="homeContainer">
        //     <Featured />
        //     <h1 className="homeTitle">Browse by property Type</h1>
        //     <PropertyList />
        //     <h1>Trending destinations</h1>
        //     <p>Most popular choices for travellers from India</p>
        //     <TrendingDest />
        //     <h1>Stay at our top unique properties</h1>
        //     <p style={{ color: "gray" }}>
        //       From castles and villas to boats and igloos, we've got it all
        //     </p>
        //     <UniqueProperties />
        //     <ListMail />
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default Home;
