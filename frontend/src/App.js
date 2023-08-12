import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home";
import HotelList from "./pages/HotelList/HotelList";
import Hotel from "./pages/Hotel/Hotel";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import AddHotel from "./components/AddHotel/AddHotel";

function App() {

  const Layout = () =>{
    return (
      <div className="app">

          <Navbar />
          <Outlet />
          <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/hotels",
          element: <HotelList />,
        },
        {
          path: "/hotel/:id",
          element: <Hotel />,
        },
        {
          path: "/admin/addHotel",
          element: <AddHotel />,
        },



      ],
    },
    // {
    //   path: "/register",
    //   element: <Register />,
    // },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
