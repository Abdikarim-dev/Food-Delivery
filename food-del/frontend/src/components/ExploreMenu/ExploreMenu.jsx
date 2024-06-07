import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  return (
    <div className='flex flex-col gap-5' id='explore-menu'>
      <h1 className='text-gray-900 font-medium'>Explore our menu</h1>
      <p className='max-w-[60%] text-gray-500'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="flex justify-between items-center gap-7 text-center my-5 overflow-x-scroll no-scrollbar">
        {menu_list && menu_list.map((item, index) => (
          <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='cursor-pointer'>
            <img src={item.menu_image} className={`w-[7.5vw] min-w-[80px] rounded-full transition duration-200 ${category === item.menu_name ? "border-4 border-tomato p-0.5" : ""}`} alt="" />
            <p className='mt-2 text-gray-600 text-[max(1.4vw,16px)]'>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr className='my-2 h-0.5 bg-gray-200 border-none'/>
    </div>
  );
};

export default ExploreMenu;
