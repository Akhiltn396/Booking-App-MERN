import LoadingSpinner from "../Spinner/Spinner";
import useFetch from "../useFetch";
import "./UniqueProperties.scss";

const UniqueProperties = () => {

  const {data,loading,error} = useFetch("http://localhost:3003/api/hotels?featured=true&limit=4")
  return (
    <div className="fp">
      {
      loading ? <LoadingSpinner/>
      :
      <>
      {data.map( item=>(

        <div className="fpItem" key={item._id}>
        <img
          src={item.photos[0]}
          alt=""
          className="fpImg"
          />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting from Rupees {}</span>
        {item.rating && <div className="fpRating">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>}
      </div>
     ) )}

    </>
    }
    </div>
  );
};

export default UniqueProperties;