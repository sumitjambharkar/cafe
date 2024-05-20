import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";
import config from "../config";
import Notify from "simple-notify";

const Home = () => {
  const navigate = useNavigate();
  const [firstTale, setFirstTable] = useState([])
  const { user: item } = useSelector((state) => state.user);
  const user = decodeToken(item);
  console.log(user);

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  const showTable = async() => {
    try {
      const result = await axios.get(`${config}/show-table`,{params:{userId: user.id,}})
      console.log(result);
      setFirstTable(result.data);
    } catch (error) {
      console.log(result);
    }
  }

  useEffect(() => {
    showTable()
  }, [])
  

  const createTable = async () => {
    const table = prompt()
    console.log(table);
    if (table) {
      try {
        await axios.post(`${config}/add-table`, {
          table: table,
          userId: user.id,
        });
        showTable()
      } catch (error) {
        console.log(error);
      }
    } else {
      new Notify({
        status: "error",
        title: "Error",
        text: "Enter Table Number",
        effect: "fade",
        speed: 300,
        customClass: "",
        customIcon: "",
        showIcon: true,
        showCloseButton: true,
        autoclose: false,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: "right top",
      });
    }
  };

  const removeTable = async () => {
    const table = prompt()
    try {
      await axios.delete(`${config}/single-table-delete`, { data: { table:table,author:user.id } });
      showTable()
    } catch (error) {
      console.log(error);
    }
  }

  const openTable = (id)=> {
    navigate("/Dish",{state:{id}})
  }

  return (
    <>
      <div className="extra_section">
        <button onClick={createTable}>Add Table</button>
        <button onClick={removeTable}>Remove Table</button>
      </div>
      <div className="all_tables">
       {firstTale.map((doc)=>(
         <div className={doc.isOnline?"single_table_book":"single_table"} onClick={()=>openTable(doc._id)} key={doc._id}>
         <div className="section">
         <h5> {doc.totalAmount?`Running Rs.${doc.totalAmount}`:null}</h5>
           <span></span>
           <span>Table No {doc.table}</span>
         </div>
       </div>
       ))}
      </div>
    </>
  );
};

export default Home;
