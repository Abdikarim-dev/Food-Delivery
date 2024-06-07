import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';


const Verify = () => {
  const { url } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + '/api/order/verify', { success, orderId });
    if (response.data.success) {
      navigate('/myorders');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='min-h-[60vh] grid'>
      <div className="w-24 h-24 place-self-center border-4 border-gray-400 border-t-[tomato] border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
