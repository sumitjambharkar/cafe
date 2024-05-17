import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBook, faHouse, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import config from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
import { logout } from '../features/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user: item } = useSelector((state) => state.user);
  const user = decodeToken(item);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  

  useEffect(() => {
    const getUser = async () => {
      if (user?.id) {
        try {
          const result = await axios.get(`${config}/user/${user?.id}`);
          setEmail(result.data.email);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };
    
    getUser();
  }, [user?.id]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const userLogout = async () => {
    try {
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <div className="navbar">
        <div className='header'>
        <span>{new Date().toLocaleDateString()}</span>
        <div className="dropdown">
        <button className="dropbtn">{email}</button>
        <div className="dropdown-content">
            <Link to="/setting">Settings</Link>
            <Link onClick={userLogout}>Logout</Link>
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
            <Link onClick={toggleDrawer} to="/sale-report">Today Sale Report</Link>
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
