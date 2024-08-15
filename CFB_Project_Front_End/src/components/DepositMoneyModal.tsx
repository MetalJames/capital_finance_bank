import axios from 'axios';
import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

type DepositMoneyModalProps = {
    accountType: string;
    isOpen: boolean;
    onClose: () => void;
};

const DepositMoneyModal = ({ accountType, isOpen, onClose }: DepositMoneyModalProps) => {
    const { user, refreshUserData } = useContext(UserContext);
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const maxDeposit = 2000;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleDeposit = async () => {
        console.log('Handle deposit triggered');
        const depositAmount = parseFloat(amount);
        
        console.log('Deposit amount:', depositAmount);
        
        if (!user!.email) {
            setError('User email is not defined.');
            return;
        }

        if (isNaN(depositAmount) || depositAmount <= 0) {
            setError('Invalid deposit amount.');
            return;
        }

        if (depositAmount > maxDeposit) {
            setError(`Amount exceeds ${maxDeposit} CAD limit`);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/deposit', {
                email: user?.email,
                accountType,
                amount: depositAmount,
            });

            console.log('Deposit response:', response);

            // After successful deposit, refresh the user data to reflect the new balance
            refreshUserData(user!.email);
            onClose(); // Close modal
        } catch (error) {
            console.error('Deposit error:', error);
            setError('Failed to deposit money. Please try again later.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
            <div className="bg-white p-6 rounded-md w-full max-w-lg">
                <h3 className="text-xl font-bold mb-4">Deposit Money to {accountType}</h3>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Bank Name</label>
                    <input type="text" className="border border-gray-300 p-2 rounded w-full" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Company that Paying</label>
                    <input type="text" className="border border-gray-300 p-2 rounded w-full" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input type="text" className="border border-gray-300 p-2 rounded w-full" />
                </div>

                <div className="flex justify-between mb-4 gap-x-1">
                    <div className="w-1/3">
                        <label className="block text-xs font-medium mb-1">Check <br /> Number</label>
                        <p className="text-xs text-gray-500 mb-1">Format: <br /> 001 etc.</p>
                        <input type="text" maxLength={3} className="border border-gray-300 p-1 rounded w-full text-center" />
                    </div>
                    <div className="w-1/3">
                        <label className="block text-xs font-medium mb-1">Branch <br /> Number</label>
                        <p className="text-xs text-gray-500 mb-1">Format: <br /> 0026-002 etc.</p>
                        <input type="text" maxLength={8} className="border border-gray-300 p-1 rounded w-full text-center" />
                    </div>
                    <div className="w-1/3">
                        <label className="block text-xs font-medium mb-1">Financial <br /> Institution</label>
                        <p className="text-xs text-gray-500 mb-1">Format: <br /> 32145-67 etc.</p>
                        <input type="text" maxLength={8} className="border border-gray-300 p-1 rounded w-full text-center" />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Deposit Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                    <small className="text-red-500">You cannot deposit more than {maxDeposit} CAD.</small>
                </div>

                {error && <div className="mb-4 text-red-500">{error}</div>}

                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleDeposit}
                    >
                        Deposit
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default DepositMoneyModal;
