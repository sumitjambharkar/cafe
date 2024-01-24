import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const uid = location.state;
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [table, setTable] = useState("");
  const [searchOrder,setSearchOrder] = useState("")

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3002/show-all-product`
        );
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const getOrder = async () => {
    try {
      const result = await axios.get(`http://localhost:3002/single-table`, {
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
  }, [uid.id]);

  const addOrder = async (doc) => {
    try {
      const result = await axios.post(`http://localhost:3002/add-order`, {
        id: uid.id,
        name: doc.name,
        price: doc.price,
        qty: 1,
      });
      getOrder();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const result = await axios.post(
        `http://localhost:3002/basket-order-remove`,
        {
          id: uid.id,
          orderId: orderId,
        }
      );
      getOrder();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const increment = async (check) => {
    console.log(check);
    try {
      const result = await axios.post(
        `http://localhost:3002/basket-order-increment-decrement`,
        {
          id: uid.id,
          orderId: check.id,
          action: check.action,
        }
      );
      getOrder();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const payment = (id) => {
    navigate("/payment", { state: { id: id, total: table.totalAmount } });
  };
  return (
    <>
      <div className="dish_section">
        <div className="order_section">
          <div className="input_section">
            <div className="search_bar">
              <input onChange={(e)=>setSearchOrder(e.target.value)} placeholder="Search Products" type="text" />
              <span>&#128269;</span>
            </div>
          </div>
          <div className="all_product">
            {data
               .filter(
                (doc) =>
                  doc.name
                    .toLowerCase()
                    .indexOf(searchOrder.toLowerCase()) !== -1
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
        <div className="bill_section">
          <h4>Table {table.table}</h4>
          <table>
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
                  <td>
                    {doc.name}
                    <span
                      onClick={() => deleteOrder(doc._id)}
                      className="remove_item"
                    >
                      x
                    </span>
                  </td>
                  <td>{doc.price}</td>
                  <td>
                    <span
                      onClick={() =>
                        increment({ id: doc._id, action: "decrement" })
                      }
                      className="increment_item"
                    >
                      -
                    </span>
                    {doc.qty}
                    <span
                      onClick={() =>
                        increment({ id: doc._id, action: "increment" })
                      }
                      className="decrement_item"
                    >
                      +
                    </span>
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
                <th style={{ cursor: "pointer" }}>Print</th>
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
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;
