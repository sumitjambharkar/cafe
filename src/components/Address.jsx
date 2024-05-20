import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { useSelector } from 'react-redux'; // Import useSelector to get the user
import config from '../config';
import Notify from 'simple-notify';

const Address = () => {
  const {user:item} = useSelector((state) => state.user);
  const user = decodeToken(item); // Get the user from the Redux store
  const [data, setData] = useState({});

  useEffect(() => {
    const getData= async()=> {
      const result = await axios.get(`${config}/show-address/${user.id}`)
      setData(result.data);
    }
    getData()
  }, [user.id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const add = async () => {
    try {
        const result = await axios.post(`${config}/update-or-add-address`, {
            name: data.name,
            address: data.address,
            number: data.number,
            gst: data.gst,
            author: user.id
        });
        new Notify({
            status: "success",
            title:result.data.message,
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
        console.error('Failed to add address:', error);
        alert('Failed to add address.');
    }
};

  return (
    <div className='address'>
      <div className='rest_form'>
        <div className='rest_center'>
          <label>Restaurant Name</label>
          <input
            name="name"
            value={data?.name}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className='rest_center'>
          <label>Restaurant Address</label>
          <input
            name="address"
            value={data?.address}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className='rest_center'>
          <label>GSTIN</label>
          <input
            name="gst"
            value={data?.gst}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className='rest_center'>
          <label>Phone Number</label>
          <input
            name="number"
            value={data?.number}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className='rest_center'>
          {data?<button onClick={add}>Update</button>:<button onClick={add}>Add</button>}
        </div>
      </div>
    </div>
  );
};

export default Address;
