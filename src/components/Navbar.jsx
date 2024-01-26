import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBook, faHouse, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {logout,user}  = useAuth()
  const navigate = useNavigate()

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    logout()
    navigate("/login")
  }
  
  return (
    <div>
      <div className="navbar">
        <div className='header'>
        <span>{new Date().toLocaleDateString()}</span>
        <div className="dropdown">
        <button className="dropbtn">{user?.email}</button>
        <div className="dropdown-content">
            <Link to="/setting">Settings</Link>
            <Link onClick={handleLogout}>Logout</Link>
        </div>
    </div>
        </div>
      
      <div className="open-drawer-btn" onClick={toggleDrawer}>
      <FontAwesomeIcon icon={faBars} />
      </div>

      <div className={`drawer ${drawerOpen ? 'open' : ''}`} id="appDrawer">
        <div className="close-drawer-btn" onClick={toggleDrawer}>
        <FontAwesomeIcon icon={faXmark} />
        </div>

        <ul>
          <li>
          <FontAwesomeIcon icon={faHouse} />
            <Link onClick={toggleDrawer} to="/">Home</Link>
          </li>
          <li>
          <FontAwesomeIcon icon={faBook} />
            <Link onClick={toggleDrawer} to="/sale-report">Sale Report</Link>
          </li>
          <li>
          <FontAwesomeIcon icon={faPenToSquare} />
            <Link onClick={toggleDrawer} to="/add-products">Add Products</Link>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
