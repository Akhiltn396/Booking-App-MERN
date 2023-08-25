import {
  BrowserRouter,
  Outlet,
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import "./App.css";
import ReactDOM from "react-dom/client";

import Home from "./pages/Home/Home";
import HotelList from "./pages/HotelList/HotelList";
import Hotel from "./pages/Hotel/Hotel";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import AddHotel from "./components/AddHotel/AddHotel";
import Register from "./pages/Register/Register";
import AddRoom from "./components/AddRoom/AddRoom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Switch } from "@mui/material";
import Hotels from "./components/Hotels/Hotels";
import HotelSingle from "./components/HotelSingle/HotelSingle";

function App() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  console.log(isAuthenticated, loading);

  const Layout = () => {
    return (
      <div className="app">

        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  {
    /* <Route path='/hotels' element={
          <ProtectedRoute > <HotelList  /></ProtectedRoute>
              } /> */
  }

  // <BrowserRouter>
  //   <Navbar />

  //   <Router>
  //     <Route>
  //       <Route index element={<Home />} />
  //       <Route path="/hotels" element={<HotelList />} />
  //       <Route path="/hotel/:id" element={<Hotel />} />
  //       <Route path="/admin" element={<AddHotel />} />
  //       <Route path="/admin/:id" element={<AddRoom />} />
  //       <Route path="/login" element={user ? <Home /> : <Login />} />
  //       <Route path="/register" element={<Register />} />
  //       {/* <Route path="*" element={<NoPage />} /> */}
  //     </Route>
  //   </Router>
  //   <Footer />
  // </BrowserRouter>;

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
          element: <Hotels />,
        },
        // {
        //   path: "/hotels",
        //   element:<HotelList />,
        // },
        {
          path: "/hotels/:id",
          element: <HotelSingle />,
        },
        {
          path: "/admin",
          element: <ProtectedRoute isAuthenticated={user}><AddHotel /></ProtectedRoute>,
        },
        {
          path:"/admin/:id",
          element: <ProtectedRoute isAuthenticated={user}><AddRoom /></ProtectedRoute>
        },


      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:"*",
      element: <Login/>
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
