import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {

    const [itemCount, setItemCount] = useState(0);
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className='w-full mx-auto rounded-lg shadow-md transition-transform duration-300 animate-fadeIn hover:scale-105'>
            <div className='relative'>
                <img className='w-full rounded-t-lg' src={url + "/images/" + image} alt="" />
                {!cartItems[id]
                    ? <img className='w-9 absolute  bottom-4 right-4 cursor-pointer rounded-full hover:border-2 hover:border-tomato' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className="absolute bottom-4 right-4 flex items-center gap-2 p-1.5 rounded-full bg-white">
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} className='w-8' alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} className='w-8' alt="" />
                    </div>
                }
            </div>
            <div className="p-5">
                <div className="flex justify-between items-center mb-2.5">
                    <p className='text-lg font-medium'>{name}</p> 
                    <img className='w-18' src={assets.rating_starts} alt="" />
                </div>
                <p className="text-gray-500 text-sm">{desc}</p>
                <p className="text-tomato text-xl font-medium my-2.5">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem;
