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
import Invoice from "./components/Invoice";
import Address from "./components/Address";

const App = () => {

  const location = useLocation();
  
  // Define paths where Navbar should not be displayed
  const hideNavbarPaths = ['/sale-report/:id', '/login'];

  // Function to check if current path matches any hideNavbarPaths patterns
  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    new RegExp(`^${path.replace(/:[^\s/]+/g, '([\\w-]+)')}$`).test(location.pathname)
  );

  return (
    <>
       {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<UserRoute><Home /></UserRoute>} />
        <Route path="/Dish" element={<UserRoute><Products /></UserRoute>} />
        <Route path="/add-products" element={<UserRoute><ProductsList/></UserRoute>}/>
        <Route path="/add-details" element={<UserRoute><Address/></UserRoute>}/>
        <Route path="/sale-report" element={<UserRoute><SaleReport/></UserRoute>}/>
        <Route path="/payment" element={<UserRoute><Billing/></UserRoute>}/>
        <Route path="/sale-report/:id" element={<PublicRoute><Invoice/></PublicRoute>}/>
      </Routes>
    </>
  );
};

export default App;
