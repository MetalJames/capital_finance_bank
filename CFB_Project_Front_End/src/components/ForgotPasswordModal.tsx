import React from 'react';

interface ForgotPasswordModalProps {
    password?: string;
    errorMessage?: string;
    onRetry: () => void;
    onSignUp: () => void;
    onLogin: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ password, errorMessage, onRetry, onSignUp, onLogin }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-full max-w-lg">
                {errorMessage ? (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Error</h2>
                        <p className="mb-4">{errorMessage}</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={onRetry}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={onSignUp}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Sign Up
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Your Password</h2>
                        <p className="mb-4">Your password is: {password}</p>
                        <button
                            onClick={onLogin}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            OK
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
