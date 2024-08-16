import React, { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import GeneralInput from "../components/GeneralInput";
import axios from "axios";
import UserContext from "../context/UserContext";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [captchaNum1, setCaptchaNum1] = useState(0);
    const [captchaNum2, setCaptchaNum2] = useState(0);
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaError, setCaptchaError] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [modalMessage, setModalMessage] = useState(''); // State to hold modal message

    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        setCaptchaNum1(Math.floor(Math.random() * 10));
        setCaptchaNum2(Math.floor(Math.random() * 10));
        setCaptchaInput('');
    }

    const handleEnterEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleEnterPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleCaptchaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCaptchaInput(e.target.value)
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (email === '') {
            setErrorEmail(true);
            setMessage('Enter email.');
        } else if (!regEmail.test(email) && email !== '') {
            setErrorEmail(true);
            setMessage('Email is not valid.');
        } else if (password === '') {
            setErrorEmail(false)
            setErrorPassword(true);
            setMessage('Enter Password.');
        } else if (parseInt(captchaInput) !== (captchaNum1 + captchaNum2)) {
            setCaptchaError(true);
            setMessage('Captcha is incorrect. Try again.');
            generateCaptcha();
        } else {
            try {
                // Make API call to login endpoint
                //const response = await axios.post("http://localhost:5000/api/login", {
                const response = await axios.post("https://capital-finance-bank.onrender.com/api/login", {
                email,
                password,
                });
                console.log(response.data); // Log the response from backend
                // Handle successful login (redirect or state update)
                setErrorEmail(false);
                setErrorPassword(false);
                setMessage("");
                generateCaptcha();
                // Show modal and set message
                setShowModal(true);
                setModalMessage("Welcome! Logging you in...");

                // Redirect after 1.5 seconds
                setTimeout(() => {
                    setUser(response.data.user); // Update UserContext with logged-in user data
                    navigate("/myaccount/personal_details");
                    setShowModal(false);
                }, 1500);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorEmail(false);
                    setErrorPassword(false);
                    setMessage("An unexpected error occurred. Please try again later.");
                    generateCaptcha();
                } else if (axios.isAxiosError(error)) {
                    if (error.response && error.response.data) {
                        setErrorEmail(false);
                        setErrorPassword(false);
                        setMessage(error.response.data.message);
                        generateCaptcha();
                    } else {
                        setErrorEmail(false);
                        setErrorPassword(false);
                        setMessage("Something went wrong. Please try again later.");
                        generateCaptcha();
                    }
                }
            }
        }
    };

    return (
        <div className="flex flex-col justify-center  items-center h-screen">
            <div className="text-center  m-4 rounded align-middle p-[5px] px-[25px] max-w-md w-[23%] bg-[#DEAC80]">
                <h1 className="text-3xl text-bold bg-[#DEAC80] font-medium text-[#102C57]">EasyWeb Login</h1>
            </div>
            <form onSubmit={handleSubmit} className="bg-[#EADBC8] p-6 rounded-b-md shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-[#102C57] pb-[7px]">Username or Access Card</label>
                    <GeneralInput text="text" placeholder="Email Address" value={email} propFunction={handleEnterEmail} error={errorEmail}/>
                </div>
                <div className="mb-4">
                    <label className="block text-[#102C57] pb-[7px]">Password</label>
                    <GeneralInput text="password" placeholder="Password" value={password} propFunction={handleEnterPassword} error={errorPassword} />
                </div>
                {message && (
                    <div className="my-1 text-red-500 font-light text-[12px]">
                        {message}
                    </div>
                )}
                <div className="flex justify-between my-2">
                    <div>
                        <input type="checkbox" checked={rememberMe} className="mr-2 border-none outline-none" onChange={() => setRememberMe(!rememberMe)} />
                        <label className="text-[#102C57]">Remember Me</label>
                    </div>
                    
                    <Link to="/forgot-password" className="text-sky-400 cursor-pointer">Forgot your password?</Link>
                </div>
                <div className="mb-4 flex items-center">
                    <label className="text-[#102C57]">Enter the sum of {captchaNum1} + {captchaNum2}:</label>
                    <input type="text" value={captchaInput} onChange={handleCaptchaInput} className="ml-2 border-none outline-none bg-white w-16" />
                    {captchaError && (
                        <div className="my-1 text-red-500 text-sm">
                            {captchaError}
                        </div>
                    )}
                </div>
                <button type="submit" className='mt-4 my-2 bg-[#DEAC80] text-white w-full p-2 hover:bg-[#102C57] transition-colors duration-200'>LOGIN</button>
                <div className="text-[#102C57] mt-2 text-center">
                    <Link to="/signup">New User? Please Sign Up</Link>
                </div>
            </form>
            {/* Modal for success message */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-md max-w-sm">
                        <h2 className="text-xl font-bold mb-4">Welcome!</h2>
                        <p className="mb-4">{modalMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;