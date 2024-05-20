import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import config from "../config";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";
import { Link } from "react-router-dom";

const SaleReport = () => {
  const [sale, setSale] = useState([]);
  const { user: item } = useSelector((state) => state.user);
  const user = decodeToken(item);
  console.log(sale);

  const getData = async () => {
    try {
      const result = await axios.get(`${config}/sale-report`,{params:{userId:user.id}});
      setSale(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const paymentMode = (mode) => {
    let pay = sale.filter((doc) => doc.paymentMethod === mode);
    return pay.reduce((acc, curr) => acc + curr.totalAmount, 0);
  };

  let mainTotal =
    paymentMode("Cash") +
    paymentMode("Card") +
    paymentMode("UPI") +
    paymentMode("Others");
  return (
    <>
      <div className="sale_header">
        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681201802/New_Project_7_jiaulw.png"
            />
          </div>
          <h6>Bill</h6>
          <p>{sale.length}</p>
        </div>
        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681192004/New_Project_3_afuhlk.png"
            />
          </div>
          <h6>Cash</h6>
          <p>{paymentMode("Cash")}</p>
        </div>

        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681192175/New_Project_4_jmxkil.png"
            />
          </div>
          <h6>Card</h6>
          <p>{paymentMode("Card")}</p>
        </div>

        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681192328/New_Project_5_cw22p7.png"
            />
          </div>
          <h6>UPI</h6>
          <p>{paymentMode("UPI")}</p>
        </div>
        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681205248/New_Project_8_blkx43.png"
            />
          </div>
          <h6>OTHERS</h6>
          <p>{paymentMode("Others")}</p>
        </div>

        <div className="cercle">
          <div className="salelogo">
            <img
              className="saleimage"
              src="https://res.cloudinary.com/clennation/image/upload/v1681192288/New_Project_6_n3dwrf.png"
            />
          </div>
          <h6>Total</h6>
          <p>{mainTotal}</p>
        </div>
      </div>
      <div className="rowbox">
        <table>
          <tr>
            <th>Sr.No</th>
            <th>Cashier Name</th>
            <th>Table No</th>
            <th>Time</th>
            <th>Pay Mode</th>
            <th>Amount</th>
            <th>Bill</th>
          </tr>

          {sale.map((ele, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{ele._id}</td>
              <td>Table {ele.table}</td>
              <td>{moment(ele.createdAt).format("lll")}</td>
              <td>{ele.paymentMethod}</td>
              <td>{ele.totalAmount}</td>
              <td><Link  to={`${ele.productId}`}>View</Link></td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default SaleReport;
