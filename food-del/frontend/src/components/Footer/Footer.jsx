import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='text-gray-400 bg-gray-800 flex flex-col items-center gap-5 py-5 px-[8vw] pt-20' id='footer'>
      <div className="w-full grid grid-cols-[2fr,1fr,1fr] gap-20">
        <div className="flex flex-col items-start gap-5">
          <h1 className='text-white'>FoodDash</h1>
          <p className='text-white'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <div className="flex gap-4 text-white">
            <img src={assets.facebook_icon} className='w-10' alt="" />
            <img src={assets.twitter_icon} className='w-10' alt="" />
            <img src={assets.linkedin_icon} className='w-10' alt="" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h2 className='text-white'>COMPANY</h2>
          <ul className='text-white'>
            <li className='mb-2.5 list-none cursor-pointer text-white'>Home</li>
            <li className='mb-2.5 list-none cursor-pointer text-white'>About us</li>
            <li className='mb-2.5 list-none cursor-pointer text-white'>Delivery</li>
            <li className='mb-2.5 list-none cursor-pointer text-white'>Privacy policy</li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h2 className='text-white'>GET IN TOUCH</h2>
          <ul>
            <li className='mb-2.5 list-none text-white'>+252619828414</li>
            <li className='mb-2.5 list-none text-white'>contact@FoodDash</li>
          </ul>
        </div>
      </div>
      <hr className='w-full h-0.5 my-5'/>
      <p className="text-center text-white">Copyright 2024 © FoodDash.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
