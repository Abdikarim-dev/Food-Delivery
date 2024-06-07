import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='my-24'>
      <div className="cart-items">
        <div className="grid grid-cols-6 items-center text-gray-500 text-[min(1vw,12px)]">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr className='h-px bg-gray-300 border-none' />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="grid grid-cols-6 items-center text-black my-2">
                  <img src={`${url}/images/${item.image}`} alt="" className='w-12' />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <div className='max-w-[40px] text-center border border-gray-200 p-2 text-[12px]'>{cartItems[item._id]}</div>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className='cursor-pointer' onClick={() => removeFromCart(item._id)}>x</p>
                </div>
                <hr className='h-px bg-gray-300 border-none' />
              </div>
            )
          }
        })}
      </div>
      <div className="flex justify-between mt-20 gap-[min(12vw,20px)] flex-col-reverse md:flex-row">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Cart Totals</h2>
          <div className="flex flex-col gap-5 mt-5">
            <div className="flex justify-between text-gray-600"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
            <hr className='h-px bg-gray-300 border-none' />
            <div className="flex justify-between text-gray-600"><p>Delivery Fee</p><p>${getTotalCartAmount() === 0 ? 0 : 5}</p></div>
            <hr className='h-px bg-gray-300 border-none' />
            <div className="flex justify-between font-bold"><b>Total</b><b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b></div>
          </div>
          <button onClick={() => navigate('/order')} className="bg-orange-500 text-white w-[min(20vw,200px)] p-3 rounded-md mt-5">PROCEED TO CHECKOUT</button>
        </div>
        <div className="flex-1">
          <p className="text-gray-600">If you have a promo code, Enter it here</p>
          <div className='flex justify-between items-center bg-gray-200 rounded-md mt-2 p-2'>
            <input type="text" placeholder='promo code' className="bg-transparent border-none outline-none pl-2 flex-grow" />
            <button className="w-[min(10vw,150px)] p-3 bg-black text-white rounded-md">Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
