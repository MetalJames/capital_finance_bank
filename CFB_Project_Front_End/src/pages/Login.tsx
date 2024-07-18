import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GeneralInput = ({ text, value, propFunction, error, className }) => {
    return (
        <input
            type={text}
            value={value}
            onChange={propFunction}
            className={`${className} ${error ? 'border-red-500' : ''} w-full p-2 bg-white`}
        />
    );
};

const Login = () => {
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

    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        setCaptchaNum1(Math.floor(Math.random() * 10));
        setCaptchaNum2(Math.floor(Math.random() * 10));
        setCaptchaInput('');
    };

    const handleEnterEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleEnterPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleCaptchaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCaptchaInput(e.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (email === '') {
            setErrorEmail(true);
            setMessage('Enter email.');
        } else if (!regEmail.test(email) && email !== '') {
            setErrorEmail(true);
            setMessage('Email is not valid.');
        } else if (password === '') {
            setErrorEmail(false);
            setErrorPassword(true);
            setMessage('Enter Password.');
        } else if (parseInt(captchaInput) !== (captchaNum1 + captchaNum2)) {
            setCaptchaError(true);
            setMessage('Captcha is incorrect. Try again.');
            generateCaptcha();
        } else {
            setCaptchaError(false);
            alert('Thank you! This is just a demo :)');
            setEmail('');
            setPassword('');
            setRememberMe(false);
            setErrorEmail(false);
            setErrorPassword(false);
            setMessage('');
            generateCaptcha();
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
                    <GeneralInput text="text" value={email} propFunction={handleEnterEmail} error={errorEmail} className="border-none outline-none" />
                </div>
                <div className="mb-4">
                    <label className="block text-[#102C57] pb-[7px]">Password</label>
                    <GeneralInput text="password" value={password} propFunction={handleEnterPassword} error={errorPassword} className="border-none outline-none" />
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
                    
                    <a href="#" className="text-[#102C57] cursor-pointer">Forgot your password?</a>
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
        </div>
    );
};

export default Login;
