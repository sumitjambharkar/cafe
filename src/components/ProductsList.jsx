import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductsList = () => {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);

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
    try {
      const result = await axios.delete(
        `http://localhost:3002/delete-single-product`,
        { params: { id } }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="product_search">
        <button className="add_product">Add Product</button>
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
                <td>update</td>
                <td style={{ cursor: "pointer" }}>
                  <button onClick={() => productDelete(doc._id)}>x</button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
