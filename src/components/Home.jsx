import React, { useEffect } from 'react'
import useAuth from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const Home = () => {

 const {user} = useAuth()
 const navigate = useNavigate();

 useEffect(() => {
  if (user?.role) {
    navigate("/");
  } else {
    navigate("/login");
  }
}, [user?.role]);

  return (
   <>
    <div className='extra_section'>
      <button>Add Table</button>
      <button>Remove Table</button>
     </div>
     <div className='all_tables'>
       <div className='single_table'>
         <div className='section'>
         <span>Running Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
       <div className='single_table'>
         <div className='section'>
         <span>Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
       <div className='single_table'>
         <div className='section'>
         <span>Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
       <div className='single_table'>
         <div className='section'>
         <span>Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
       <div className='single_table'>
         <div className='section'>
         <span>Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
       <div className='single_table'>
         <div className='section'>
         <span>Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
       <div className='single_table'>
         <div className='section'>
         <span>Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
       <div className='single_table'>
         <div className='section'>
         <span>Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
       <div className='single_table'>
         <div className='section'>
         <span>Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
       <div className='single_table'>
         <div className='section'>
         <span>Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
       <div className='single_table'>
         <div className='section'>
         <span>Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
       <div className='single_table'>
         <div className='section'>
         <span>Rs.200</span>
         <span>Table No 1</span>
         </div>
       </div>
     </div>
   </>
  )
}

export default Home