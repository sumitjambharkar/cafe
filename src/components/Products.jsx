import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Notify from "simple-notify";
import { faMagnifyingGlass, faMinus, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReactToPrint } from 'react-to-print';
import config from "../config";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";


const Products = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const uid = location.state;
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [table, setTable] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
  const { user: item } = useSelector((state) => state.user);
  const user = item ? decodeToken(item) : null; 
  

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`${config}/show-all-product`,{params:{userId:user.id}});
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const getOrder = async () => {
    try {
      const result = await axios.get(`${config}/single-table`, {
        params: { id: uid?.id },
      });
      setOrder(result.data.basket);
      setTable(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, [uid?.id]);

  const addOrder = async (doc) => {
    try {
      const result = await axios.post(`${config}/add-order`, {
        id: uid?.id,
        name: doc.name,
        price: doc.price,
        qty: 1,
      });
      getOrder();
      new Notify({
        status: "success",
        title: "Added",
        effect: "fade",
        speed: 100,
        customClass: "",
        customIcon: "",
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 1000,
        gap: 20,
        distance: 20,
        type: 1,
        position: "right top",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const result = await axios.post(
        `${config}/basket-order-remove`,
        {
          id: uid.id,
          orderId: orderId,
        }
      );
      getOrder();
      console.log(result);
      new Notify({
        status: "error",
        title: `Removed `,
        text: result.data.message,
        effect: "fade",
        speed: 100,
        customClass: "",
        customIcon: "",
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 1000,
        gap: 20,
        distance: 20,
        type: 1,
        position: "right top",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const increment = async (check) => {
    try {
      const result = await axios.post(
        `${config}/basket-order-increment-decrement`,
        {
          id: uid.id,
          orderId: check.id,
          action: check.action,
        }
      );
      getOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const payment = (id) => {
    navigate("/payment", { state: { id: id, total: table.totalAmount } });
  };

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  

  return (
    <>
      <div className="dish_section">
        <div className="order_section">
          <div className="input_section">
            <div className="search_bar">
              <input
                onChange={(e) => setSearchOrder(e.target.value)}
                placeholder="Search Products"
                type="text"
              />
              <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
            </div>
          </div>
          <div className="all_product">
            {data
              .filter(
                (doc) =>
                  doc.name.toLowerCase().indexOf(searchOrder.toLowerCase()) !==
                  -1
              )
              .filter((doc) => doc.isOnline === true)
              .map((doc) => (
                <div
                  onClick={() => addOrder(doc)}
                  key={doc._id}
                  className="product"
                >
                  <span>{doc.name}</span>
                  <span>Rs.{doc.price}</span>
                  <button>Add Order</button>
                </div>
              ))}
          </div>
        </div>
        <div ref={componentRef}  className="bill_section">
          <h4 className="tag">Table {table.table}</h4>
          {order?.length > 0 ?<table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.map((doc, i) => (
                <tr key={doc.name}>
                  <td className="item_name">
                    {doc.name}
                    <div
                      className="remove_item"
                      onClick={() => deleteOrder(doc._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </td>
                  <td>{doc.price}</td>
                  <td>
                    <div
                      className="increment_item"
                      onClick={() =>
                        increment({ id: doc._id, action: "decrement" })
                      }
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </div>
                    {doc.qty}
                    <div
                      className="decrement_item"
                      onClick={() =>
                        increment({ id: doc._id, action: "increment" })
                      }
                    >
                     <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </td>
                  <td>{doc.total}</td>
                </tr>
              ))}
            </tbody>
            <tbody>
              <tr>
                <th>Total</th>
                <th></th>
                <th></th>
                <th>Rs.{table.totalAmount}</th>
              </tr>
              <tr>
                <th onClick={handlePrint}  style={{ cursor: "pointer" }}>Print</th>
                {table.basket && table.basket.length > 0 ? (
                  <th
                    onClick={() => payment(uid.id)}
                    style={{ cursor: "pointer" }}
                  >
                    Payment
                  </th>
                ) : (
                  <th style={{ cursor: "pointer" }}>Payment</th>
                )}
                <th></th>
                <th></th>
              </tr>
            </tbody>
          </table>:null}
        </div>
       
      </div>
    </>
  );
};

export default Products;
