import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import config from "../config";

const Edit = ({ getData, id }) => {
  const [data, setData] = useState("");
  console.log(data);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `${config}/show-single-product/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const handleCustomSubmit = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Enter name and price",
      html:
        `<input id="swal-input1" value="${data.name}" class="swal2-input" placeholder="Name">` +
        `<input id="swal-input2" value="${data.price}" class="swal2-input" placeholder="Price">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      const [nameValue, priceValue] = formValues;

      // Basic input validation
      if (!nameValue || !priceValue) {
        Swal.fire("Name and price cannot be empty");
        return;
      }

      // Send data to your API using axios
      try {
        const response = await axios.put(
          `${config}/update-single-product`,
          {
            name: nameValue,
            price: priceValue,
            id: id,
          }
        );
        getData();
        // Handle the response
        console.log("API response:", response.data);
        Swal.fire(`Updated Successfully`);
      } catch (error) {
        console.error("Error adding data to API:", error);
        Swal.fire(`Error adding data to API`);
      }
    }
  };

  return (
    <div>
      <FontAwesomeIcon onClick={handleCustomSubmit} icon={faPenToSquare} />
    </div>
  );
};

export default Edit;
