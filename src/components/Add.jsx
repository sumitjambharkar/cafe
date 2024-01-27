import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../context/useAuth";

const Add = ({ getData }) => {
  const { user } = useAuth();
  const handleCustomSubmit = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Enter name and price",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Price">',
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
        const response = await axios.post(
          "http://localhost:3002/create-product",
          {
            name: nameValue,
            price: priceValue,
            userId: user._id,
          }
        );
        getData();
        // Handle the response
        console.log("API response:", response.data);
        Swal.fire(`Added Successfully`);
      } catch (error) {
        console.error("Error adding data to API:", error);
        Swal.fire(`Error adding data to API`);
      }
    }
  };

  return (
    <div>
      <button className="add_product" onClick={handleCustomSubmit}>
        Add Product
      </button>
    </div>
  );
};

export default Add;
