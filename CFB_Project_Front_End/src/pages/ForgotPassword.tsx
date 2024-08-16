import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from '../components/ForgotPasswordModal'; 

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            //const response = await axios.get('http://localhost:5000/api/forgot-password', { params: { email } });
            const response = await axios.get('https://capital-finance-bank.onrender.com/api/forgot-password', { params: { email } });
            setPassword(response.data.password);
            setErrorMessage(undefined);
            setShowModal(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404) {
                    setErrorMessage('Email not found');
                } else {
                    setErrorMessage('An error occurred. Please try again.');
                }
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
            setPassword(undefined);
            setShowModal(true);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Forgot Your Password?</h1>
            </div>
            <form onSubmit={handleEmailSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 mb-4"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-700 text-white w-full p-2 hover:bg-blue-900 transition-colors duration-200"
                >
                    Submit
                </button>
            </form>
            {showModal && (
                <ForgotPasswordModal
                    password={password}
                    errorMessage={errorMessage}
                    onRetry={() => setShowModal(false)}
                    onSignUp={() => navigate('/signup')}
                    onLogin={() => navigate('/login')}
                />
            )}
        </div>
    );
};

export default ForgotPassword;
