import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../context/useAuth";


const Billing = () => {
  const {user}  =useAuth()
  console.log(user);
  const location = useLocation();
  const uid = location.state;
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pickupAmount, setPickupAmount] = useState("");
  const [returnAmount, setReturnAmount] = useState("");

  const [selectedPayment, setSelectedPayment] = useState(null);


  const returnnn = () => {
    return Math.abs(uid.total - pickupAmount);
  };
  const paymet = async () => {
    try {
      const result = await axios.post(`https://rest-bar-backend.onrender.com/payment-method`, {
      paymentMethod:paymentMethod?paymentMethod:"Cash",
      pickupAmount:pickupAmount,
      returnAmount:returnnn(),
      id:uid.id,
      user:user.email,
      userId:user._id
    });
    navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  
  
  return (
    <>
      <Tabs>
        <TabList>
          <Tab onClick={(e) => setPaymentMethod("Cash")}>Cash</Tab>
          <Tab onClick={(e) => setPaymentMethod("Card")}>Card</Tab>
          <Tab onClick={(e) => setPaymentMethod("UPI")}>UPI</Tab>
          <Tab onClick={(e) => setPaymentMethod("Others")}>OTHERS</Tab>
        </TabList>
        <div className="tabbox">
          <TabPanel>
            <div className="billbox">
              <div className="h1div">
                <h2 className="h2payment">CASH PAYMENT</h2>
                <div className="paymentlogo">
                  <img
                    className="paymentimage"
                    src="https://img.icons8.com/ios/256/cash-in-hand.png"
                  />
                </div>
              </div>
              <div>
                {!show ? (
                  <div className="paymet_getway">
                    <li>
                      <h6>You Want add Tip</h6>
                    </li>
                    <li>
                      <button className="dssds" onClick={() => setShow(true)}>Yes</button>
                    </li>
                  </div>
                ) : (
                  <div className="paymet_getway">
                    <li>
                      <h6>cancel Tip</h6>
                    </li>
                    <li>
                      <button className="dssds" onClick={() => setShow(false)}>No</button>
                    </li>
                  </div>
                )}
                <div className="paymet_getway">
                  {" "}
                  <li>
                    <h6>TOTAL AMOUNT</h6>
                  </li>
                  <li>
                    <input value={uid.total} />
                  </li>
                </div>
                {show ? (
                  <div className="paymet_getway">
                    <li>
                      <h6>TIPS AMOUNT</h6>
                    </li>
                    <li>
                      <input />
                    </li>
                  </div>
                ) : null}
                <div className="paymet_getway">
                  <li>
                    <h6>PICKUP AMOUNT</h6>
                  </li>
                  <li>
                    <input
                      onChange={(e) => setPickupAmount(e.target.value)}
                      value={pickupAmount}
                    />
                  </li>
                </div>
                <div className="paymet_getway">
                  <li>
                    <h6>RETURN AMOUNT</h6>
                  </li>
                  <li>
                    <input value={pickupAmount && returnnn()} />
                  </li>
                </div>
                <div className="buttondiv">
                  {" "}
                  <button onClick={paymet}
                    class="dssds"
                    role="button"
                    style={{ margin: 12, padding: 8 }}
                  >
                    Payment
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
        </div>
        <div className="tabbox">
          <TabPanel>
            <div className="billbox">
              <div className="h1div">
                <h2 className="h2payment">CARD PAYMENT</h2>
                <div className="paymentlogo">
                  <img
                    className="paymentimage"
                    src="https://img.icons8.com/dotty/256/card-in-use.png"
                  />
                </div>
              </div>
              <div className="paymet_getway">
                <li>
                  <h6>TOTAL AMOUNT</h6>
                </li>
                <li>
                  <input value={uid.total} />
                </li>
              </div>
              <div className="buttondiv">
                <button onClick={paymet}
                  class="dssds"
                  role="button"
                  style={{ margin: 12, padding: 8 }}
                >
                  Payment
                </button>
              </div>
            </div>
          </TabPanel>
        </div>

        <div className="tabbox">
          <TabPanel>
            <div className="billbox">
              <div className="h1div">
                <h2 className="h2payment">UPI PAYMENT</h2>
                <div className="paymentlogo">
                  <div className="paymentimage">
                    <img
                      className="paymentimage"
                      src="https://img.icons8.com/ios-filled/256/bhim-upi.png"
                    />
                  </div>
                </div>
              </div>
              <div className="paymet_getway">
                {" "}
                <li>
                  <h6>TOTAL AMOUNT</h6>
                </li>
                <li>
                  <input value={uid.total} />
                </li>
              </div>
              <div className="buttondiv">
                {" "}
                <button onClick={paymet}
                  class="dssds"
                  role="button"
                  style={{ margin: 12, padding: 8 }}
                >
                  Payment
                </button>
              </div>
            </div>
          </TabPanel>
        </div>
        <div className="tabbox">
          <TabPanel>
          <div className="billbox">
      <div className="h1div">
        <h2 className="h2payment">OTHERS PAYMENT</h2>
        <div className="paymentlogo">
          <div className="paymentimage">
            <img
              className="paymentimage"
              src="https://img.icons8.com/windows/256/connection-status-off.png"
            />
          </div>
        </div>
      </div>
      <div className="paymet_getway">
        <input
          value="zomato"
          type="radio"
          checked={selectedPayment === "zomato"}
          onChange={handleChange}
        />
        <li>
          <h6>ZOMATO AMOUNT</h6>
        </li>
        <li>
          <input value={uid.total} />
        </li>
      </div>
      <div className="paymet_getway">
        <input
          value="swiggy"
          type="radio"
          checked={selectedPayment === "swiggy"}
          onChange={handleChange}
        />
        <li>
          <h6>SWIGY AMOUNT</h6>
        </li>
        <li>
          <input value={uid.total} />
        </li>
      </div>
      <div className="paymet_getway">
        <input
          value="delivery"
          type="radio"
          checked={selectedPayment === "delivery"}
          onChange={handleChange}
        />{" "}
        <li>
          <h6>DELEVERY AMOUNT</h6>
        </li>
        <li>
          <input value={uid.total} />
        </li>
      </div>
      <div className="paymet_getway">
        <input
          value="other"
          type="radio"
          checked={selectedPayment === "other"}
          onChange={handleChange}
        />
        <li>
          <h6>OTHERS AMOUNT</h6>
        </li>
        <li>
          <input value={uid.total} />
        </li>
      </div>
      <div className="buttondiv">
        <button onClick={paymet} className="dssds" role="button" style={{ margin: 12, padding: 8 }}>
          Payment
        </button>
      </div>
    </div>
          </TabPanel>
        </div>
      </Tabs>
    </>
  );
};

export default Billing;
