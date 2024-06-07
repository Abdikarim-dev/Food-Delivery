import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url, loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        }
        else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            loadCartData({ token: response.data.token })
            setShowLogin(false)
        }
        else {
            toast.error(response.data.message)
        }
    }

    const loginwithgoogle = () => {
        window.open("http://localhost:6005/auth/google/callback", "_self")
    }

    return (
        <div className='absolute z-10 w-full h-full bg-black bg-opacity-50 grid'>
            <form onSubmit={onLogin} className="place-self-center w-[23vw] min-w-[330px] text-gray-500 bg-white flex flex-col gap-6 p-6 rounded-lg text-sm animate-fadeIn">
                <div className="flex justify-between items-center text-black">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className="w-4 cursor-pointer" />
                </div>
                <div className="flex flex-col gap-5">
                    {currState === "Sign Up" && <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required className="outline-none border border-gray-300 p-2 rounded-md" />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' className="outline-none border border-gray-300 p-2 rounded-md" />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required className="outline-none border border-gray-300 p-2 rounded-md" />
                </div>
                <button className="bg-orange-500 text-white p-2 rounded-md text-base cursor-pointer">{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="flex items-start gap-2 mt-[-15px]">
                    <input type="checkbox" name="" id="" required className="mt-1" />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')} className="text-orange-500 font-medium cursor-pointer">Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')} className="text-orange-500 font-medium cursor-pointer">Login here</span></p>
                }
                <button type="button" className="bg-blue-500 text-white p-2 rounded-md cursor-pointer" onClick={loginwithgoogle}>
                    Sign In With Google
                </button>
            </form>
        </div>
    )
}

export default LoginPopup
