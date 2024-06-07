import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data)
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <div className='my-12'>
      <h2 className='text-2xl mb-6'>My Orders</h2>
      <div className="flex flex-col gap-5 mt-8">
        {data.map((order, index) => {
          return (
            <div key={index} className='grid grid-cols-6 items-center gap-8 text-[14px] p-4 text-gray-700 border border-red-500'>
              <img src={assets.parcel_icon} alt="" className='w-12' />
              <p>{order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity
                }
                else {
                  return item.name + " x " + item.quantity + ", "
                }
              })}</p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span className='text-red-500'>&#x25cf;</span> <b className='font-medium'>{order.status}</b></p>
              <button className='border-none p-3 rounded bg-red-100 cursor-pointer text-gray-700'>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
