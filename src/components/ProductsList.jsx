import axios from "axios";
import React, { useEffect, useState } from "react";
import Add from "./Add";
import Edit from "./Edit";
import Icon from "../assets/remove.png";
import Swal from "sweetalert2";
import Switch from "react-switch";

const ProductsList = () => {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get(`http://localhost:3002/show-all-product`);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const productDelete = async (id) => {
    console.log(id);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:3002/delete-single-product`,
          { params: { id } }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
          getData();
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to delete the product. Please try again.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  const handleChange = (newChecked) => {
    setChecked(newChecked);
  };

  return (
    <div>
      <div className="product_search">
        <Add getData={getData} />
        <div className="search_bar">
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Products"
            type="text"
          />
          <span>&#128269;</span>
        </div>
      </div>
      <div className="rowbox">
        <table>
          <tr>
            <th>Sr.No</th>
            <th>Id</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>

          {data
            .filter(
              (doc) =>
                doc.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
            .map((doc, i) => (
              <tr key={doc._id}>
                <td>{i + 1}</td>
                <td>{doc._id}</td>
                <td>{doc.name}</td>
                <td>Rs.{doc.price}</td>
                <td>
                  <Switch onChange={handleChange} checked={doc.isOnline} />
                </td>
                <td>
                  <Edit id={doc._id} getData={getData} />
                </td>
                <td style={{ cursor: "pointer" }}>
                  <img
                    onClick={() => productDelete(doc._id)}
                    height={20}
                    src={Icon}
                    alt="remove"
                  />
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
