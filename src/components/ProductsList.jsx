import React from 'react'

const ProductsList = () => {
  return (
    <div>
    <div className='product_search'>
        <button className='add_product'>Add Product</button>
      <div className='search_bar'>
      <input placeholder='Search Products' type="text"  />
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

          
              
                <tr >
                <td>j</td>
                <td>k</td>
                <td>m</td>
                <td>m</td>
                <td>
                  k
                </td>
                <td>nj</td>
              </tr>
      
        </table>
      </div>
    </div>
  )
}

export default ProductsList