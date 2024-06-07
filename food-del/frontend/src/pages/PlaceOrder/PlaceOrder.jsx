import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        country: "",
        phone: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 5,
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            toast.error("Something Went Wrong")
        }
    }

    useEffect(() => {
        if (!token) {
            toast.error("to place an order sign in first")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='flex items-start justify-between gap-12 my-24 flex-col lg:flex-row'>
            <div className="w-full max-w-[30%] lg:max-w-[30%] xl:max-w-[500px]">
                <p className='text-2xl font-semibold mb-12'>Delivery Information</p>
                <div className="flex gap-2 mb-4">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required className="mb-4 w-full p-3 border border-gray-300 rounded outline-none focus:outline-tomato" />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required className="mb-4 w-full p-3 border border-gray-300 rounded outline-none focus:outline-tomato" />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required className="mb-4 w-full p-3 border border-gray-300 rounded outline-none focus:outline-tomato" />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required className="mb-4 w-full p-3 border border-gray-300 rounded outline-none focus:outline-tomato" />
                <div className="flex gap-2 mb-4">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required className="mb-4 w-full p-3 border border-gray-300 rounded outline-none focus:outline-tomato" />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required className="mb-4 w-full p-3 border border-gray-300 rounded outline-none focus:outline-tomato" />
                </div>
                <div className="flex gap-2 mb-4">
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required className="mb-4 w-full p-3 border border-gray-300 rounded outline-none focus:outline-tomato" />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required className="mb-4 w-full p-3 border border-gray-300 rounded outline-none focus:outline-tomato" />
            </div>
            <div className="w-full max-w-[40%] lg:max-w-[40%] xl:max-w-[500px]">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className='text-xl font-semibold mb-6'>Cart Totals</h2>
                    <div>
                        <div className="flex justify-between text-gray-700 mb-4">
                            <p>Subtotal</p><p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between text-gray-700 my-4">
                            <p>Delivery Fee</p><p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between text-gray-700 mt-4">
                            <b>Total</b><b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
                        </div>
                    </div>
                </div>
                <button className='mt-12 border right-0 bg-orange-500 text-black py-3 px-6 rounded cursor-pointer w-50' type='submit'>Proceed To Payment</button>
            </div>
        </form>
    )
}

export default PlaceOrder
