import React from 'react';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-[1.5px] border-gray-400 bg-orange-400'>
      <div className="pt-12 pl-[20%] flex flex-col gap-5">
        <NavLink to='/add' className={({ isActive }) => isActive ? "flex items-center gap-3 border-[1px] border-tomato bg-[#fff0ed] border-r-0 px-3 py-2 rounded-l cursor-pointer" : "flex items-center gap-3 border-[1px] border-gray-400 border-r-0 px-3 py-2 rounded-l cursor-pointer"}>
            <img src={assets.add_icon} alt="Add" className="w-5" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className={({ isActive }) => isActive ? "flex items-center gap-3 border-[1px] border-tomato bg-[#fff0ed] border-r-0 px-3 py-2 rounded-l cursor-pointer" : "flex items-center gap-3 border-[1px] border-gray-400 border-r-0 px-3 py-2 rounded-l cursor-pointer"}>
            <img src={assets.order_icon} alt="List" className="w-5" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className={({ isActive }) => isActive ? "flex items-center gap-3 border-[1px] border-tomato bg-[#fff0ed] border-r-0 px-3 py-2 rounded-l cursor-pointer" : "flex items-center gap-3 border-[1px] border-gray-400 border-r-0 px-3 py-2 rounded-l cursor-pointer"}>
            <img src={assets.order_icon} alt="Orders" className="w-5" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
