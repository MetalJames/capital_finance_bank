import React, { useState } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

const AccountDeletionModal: React.FC<{ onClose: () => void; handleDelete: () => void; onCompletion: () => void }> = ({ onClose, handleDelete, onCompletion }) => {
    const [step, setStep] = useState(1);

    const initiateDelete = async () => {
        setStep(2);

        await new Promise<void>((resolve) => {
            setTimeout(async () => {
                await handleDelete();
                resolve();
            }, 3000);
        });

        setStep(3);
    };

    const handleSuccess = () => {
        onCompletion();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-full max-w-lg">
                {step === 1 && (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                        <p className="mb-4">Are you sure you want to delete your account?</p>
                        <button 
                            onClick={initiateDelete} 
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Confirm
                        </button>
                        <button 
                            onClick={onClose} 
                            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Deleting Account...</h2>
                        <div className="spinner"><PacmanLoader /></div>
                    </>
                )}
                {step === 3 && (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Account Deleted Successfully</h2>
                        <p className="mb-4">Your account has been deleted.</p>
                        <button 
                            onClick={handleSuccess} 
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

export default AccountDeletionModal;
