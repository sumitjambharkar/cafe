import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { decodeToken } from "react-jwt";
import Notify from 'simple-notify';
import { loginUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user: item } = useSelector((state) => state.user);
  const user = item ? decodeToken(item) : null; 

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user,navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${config}/admin-login`,
        { email, password},
        { withCredentials: true } 
      );
      if (result.status === 200) {
        new Notify({
          status: "success",
          title: "Success",
          text: result.data.message,
          effect: 'fade',
          speed: 300,
          customClass: '',
          customIcon: '',
          showIcon: true,
          showCloseButton: true,
          autoclose: false,
          autotimeout: 3000,
          gap: 20,
          distance: 20,
          type: 1,
          position: 'right top'
        });
        console.log(result.data);
      dispatch(loginUser(result.data.token))
      navigate("/");
      }
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <>
      <div className="login-section">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Username"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
