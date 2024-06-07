import React, { useContext, useState, useEffect, useRef } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [theme, setTheme] = useState('light'); // Track current theme
  const { getTotalCartQuantity, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className='flex justify-between items-center py-5'>
      <h1 className='text-3xl font-bold'>FoodDash</h1>
      <ul className='flex list-none gap-5 text-gray-700 text-lg'>
        <Link
          to='/'
          onClick={() => setMenu('home')}
          className={`${menu === 'home' ? 'border-b-2 border-gray-700 pb-1' : ''}`}
        >
          Home
        </Link>
        <Link
          to='/#explore-menu'
          onClick={() => setMenu('menu')}
          className={`${menu === 'menu' ? 'border-b-2 border-gray-700 pb-1' : ''}`}
        >
          Menu
        </Link>
        <Link
          to='/#footer'
          onClick={() => setMenu('contact')}
          className={`${menu === 'contact' ? 'border-b-2 border-gray-700 pb-1' : ''}`}
        >
          Contact Us
        </Link>
      </ul>
      <div className='flex items-center gap-10'>
        <img
          src={theme === 'light' ? assets.lightMode : assets.darkMode}
          alt='Search'
          className='cursor-pointer'
        />
        <Link to='/cart' className='relative'>
          <img src={assets.basket_icon} alt='Cart' className='cursor-pointer' />
          {getTotalCartQuantity() > 0 && (
            <div className='absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'>
              {getTotalCartQuantity()}
            </div>
          )}
        </Link>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className='bg-transparent text-gray-700 border border-red-600 py-2 px-6 rounded-full transition duration-300 hover:bg-orange-500'
          >
            Sign In
          </button>
        ) : (
          <div className='relative' ref={profileRef}>
            <img
              src={assets.profile_icon}
              alt='Profile'
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className='cursor-pointer'
            />
            {showProfileDropdown && (
              <ul className='absolute right-0 z-10 flex-col gap-2 p-3 border w-40 bg-white divide-y divide-gray-100 rounded-lg dark:bg-orange-300 dark:divide-gray-600 border-gray-300 shadow-lg'>
                <li
                  onClick={() => {
                    setShowProfileDropdown(false);
                    navigate('/myorders');
                  }}
                  className='flex items-center gap-2 mb-1 cursor-pointer hover:text-red-600'
                >
                  <img src={assets.bag_icon} alt='Orders' /> <p>Orders</p>
                </li>
                <hr className='bg-gray-300 h-px border-0' />
                <li
                  onClick={() => {
                    setShowProfileDropdown(false);
                    logout();
                  }}
                  className='flex items-center gap-2 cursor-pointer hover:text-red-600'
                >
                  <img src={assets.logout_icon} alt='Logout' /> <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;
