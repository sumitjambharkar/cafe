import React from 'react'

const Products = () => {
    const data = [1,2,3,4,5,6,7,8,9,10,11,12,1,1,1,,1]
  return (
    <>
   <div className='dish_section'>
   <div className='order_section'>
    <div className='input_section'>
    <div className='search_bar'>
      <input placeholder='Search Products' type="text"  />
      <span>&#128269;</span> 
    </div>
    </div>
    <div className='all_product'>
        {data.map((doc)=>(
            <div className='product'>
            
             <span>Vada Pav</span>
             <span>Rs.300 </span>
             <button>Add Order</button>
            
         </div>
        ))}
    </div>
    </div>
    <div className='bill_section'>
        <h4>Table 3</h4>
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
                <tr>
                    <td>Pasta <span className='remove_item'>x</span></td>
                    <td>15</td>
                    <td> <span className='increment_item'>+</span>1 <span className='decrement_item'>-</span></td>
                    <td>15</td>
                </tr>
                <tr>
                    <td>Vada <span className='remove_item'>x</span></td>
                    <td>15</td>
                    <td> <span className='increment_item'>+</span>2 <span className='decrement_item'>-</span></td>
                    <td>30</td>
                </tr>
            </tbody>
        </table>
    
    </div>
   </div>
    </>
  )
}

export default Products