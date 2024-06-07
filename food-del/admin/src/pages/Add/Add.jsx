import React, { useState } from 'react';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const [image, setImage] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            toast.success(response.data.message);
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            });
            setImage(false);
        } else {
            toast.error(response.data.message);
        }
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className='add w-50 mx-auto mt-12 text-gray-600 text-base'>
            <form className='flex flex-col gap-5' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex flex-col items-center'>
                    <p>Upload image</p>
                    <label htmlFor="image" className='cursor-pointer'>
                        <img className='w-30 h-30 object-cover rounded-md' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                    <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="image" hidden required />
                </div>
                <div className='add-product-name flex flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required className='p-2 border border-gray-300 rounded-md' />
                </div>
                <div className='add-product-description flex flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required className='p-2 border border-gray-300 rounded-md' />
                </div>
                <div className='add-category-price flex gap-8'>
                    <div className='add-category flex flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} className='p-2 border border-gray-300 rounded-md'>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex flex-col'>
                        <p>Product Price</p>
                        <input type="number" name='price' onChange={onChangeHandler} value={data.price} placeholder='$25' className='p-2 border border-gray-300 rounded-md' />
                    </div>
                </div>
                <button type='submit' className='add-btn max-w-xs border-none py-2 px-4 bg-black text-white cursor-pointer rounded-md'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
