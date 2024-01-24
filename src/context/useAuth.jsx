import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import Notify from 'simple-notify'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const token = Cookies.get("UID") || null;
  const uid = token ? decodeToken(token) : null;

  useEffect(() => {
    const getUser = async () => {
      if (uid?.id) {
        try {
          const result = await axios.get(`http://localhost:3002/user/${uid.id}`);
          setUser(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    
    getUser();
  }, [uid?.id]);
  

  const login = async (email, password) => {
    try {
      const result = await axios.post('http://localhost:3002/admin-login', { email, password });
      if (result.status === 200) {
        new Notify ({
          status:"success",
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
        })
        Cookies.set("UID", result.data.token, { expires:1});
      } else {
        setMessage({ text: result.data.message, color: "error" });
        new Notify ({
          status:"error",
          title: "Error",
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
        })
      }
    } catch (error) {
      console.log(error);
      new Notify ({
        status:"error",
        title: "Error",
        text: error.response.data.message,
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
      })
    }
  };

  const logout = () => {
    Cookies.remove("UID");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, message,logout }}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}