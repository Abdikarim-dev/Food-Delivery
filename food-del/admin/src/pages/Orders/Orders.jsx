import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url } from '../../assets/assets';

const Order = () => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data.reverse());
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  }

  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='container mx-auto p-4'>
      <h3 className='text-2xl font-semibold mb-6'>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='grid grid-cols-1 md:grid-cols-5 gap-4 border border-red-500 p-4 mb-6 text-sm text-gray-700'>
            <img className='w-16 h-16' src={assets.parcel_icon} alt="" />
            <div>
              <p className='font-semibold mb-2'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='font-semibold mt-2 mb-1'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='mb-2'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select className='bg-red-100 border border-red-500 p-2 rounded' onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order;
