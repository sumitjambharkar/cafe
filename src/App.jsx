import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductsList from "./components/ProductsList";
import 'simple-notify/dist/simple-notify.min.css'
import { UserRoute,PublicRoute } from "./routes/PrivateRoute";
import SaleReport from "./components/SaleReport";
import Billing from "./components/Billing";

const App = () => {

  const location = useLocation();

  return (
    <>
      {location.pathname === "/login" ? null : <Navbar />}
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<UserRoute><Home /></UserRoute>} />
        <Route path="/Dish" element={<UserRoute><Products /></UserRoute>} />
        <Route path="/add-products" element={<UserRoute><ProductsList/></UserRoute>}/>
        <Route path="/sale-report" element={<UserRoute><SaleReport/></UserRoute>}/>
        <Route path="/payment" element={<UserRoute><Billing/></UserRoute>}/>
      </Routes>
    </>
  );
};

export default App;
