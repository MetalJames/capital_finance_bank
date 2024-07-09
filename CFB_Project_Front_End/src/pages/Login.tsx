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
                const response = await axios.post("http://localhost:5000/api/login", {
                email,
                password,
                });
                console.log(response.data); // Log the response from backend
                // Handle successful login (redirect or state update)
                setErrorEmail(false);
                setErrorPassword(false);
                setMessage("");
                generateCaptcha();
                alert("Login successful!");
                // Example: Redirect to a new page after successful login
                // Assuming response.data contains user information
                setUser(response.data); // Update UserContext with logged-in user data
                navigate("/myaccount");
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
        // } else {
        //     setCaptchaError(false);
        //     alert('Thank you! This is just a demo :)');
        //     setEmail('');
        //     setPassword('');
        //     setRememberMe(false);
        //     setErrorEmail(false);
        //     setErrorPassword(false);
        //     setMessage('');
        //     generateCaptcha();
        // }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-3xl text-bold mb-4">Log In to Your Account</h1>
                <p>
                    or <Link to="/signup" className="text-sky-400 cursor-pointer">Sign Up</Link>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <GeneralInput text="text" placeholder="Email Address" value={email} propFunction={handleEnterEmail} error={errorEmail} />
                    <GeneralInput text="password" placeholder="Email Password" value={password} propFunction={handleEnterPassword} error={errorPassword} />
                </div>
                {message && (
                    <div className="my-1 text-[red] font-light text-[12px]">
                        {message}
                    </div>
                )}
                <div className="flex justify-between my-2">
                    <div>
                        <input type="checkbox" checked={rememberMe} className="mr-2" onChange={() => setRememberMe(!rememberMe)} />
                        <label>Remember Me</label>
                    </div>
                    <a href="#" className="text-sky-400 cursor-pointer">Forgot your password?</a>
                </div>
                <div className="mb-4">
                    <label>Enter the sum of {captchaNum1} + {captchaNum2}:</label>
                    <input type="text" value={captchaInput} onChange={handleCaptchaInput} className="ml-2 border" />
                    {captchaError && (
                        <div className="my-1 text-red-500 text-sm">
                            {captchaError}
                        </div>
                    )}
                </div>
                <button type="submit" className='mt-4 my-2 bg-blue-700 text-white w-full p-2 hover:bg-blue-900 transition-colors duration-200'>Sign In</button>
            </form>
        </div>
    )
}

export default Login;
