import React, { useContext } from 'react'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext);

  return (
    <div className='mt-8' id='food-display'>
      <h2 className='text-[max(2vw,24px)] font-semibold'>Top dishes near you</h2>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-8 gap-8 row-gap-12'>
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id} />
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay;
