
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

const TransferFunds = () => {
    const { user, refreshUserData } = useContext(UserContext);

    // Create Axios instance with base URL
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api', // Adjust as per your backend server setup
    });

    // State for transfer form
    const [transferData, setTransferData] = useState({
        fromAccountNumber: '',
        toAccountNumber: '',
        amount: '',
    });

    // State for modal
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [successModal, setSuccessModal] = useState(false);

    // Handle transfer action
    const handleTransfer = async () => {
        const { fromAccountNumber, toAccountNumber } = transferData;

        if (fromAccountNumber === toAccountNumber) {
            setMessage('Cannot transfer funds to the same account.');
            setShowModal(true);
            return;
        }

        const fromAccount = user!.accounts.find(acc => acc.accountType === transferData.fromAccountNumber);
        const amount = parseFloat(transferData.amount);

        if (fromAccount && fromAccount.balance < amount) {
            setMessage('Insufficient funds. The transfer amount is greater than the available balance.');
            setShowModal(true);
            return;
        }

        try {
            const response = await axiosInstance.post('/transfer', { 
                fromAccountNumber: transferData.fromAccountNumber, 
                toAccountNumber: transferData.toAccountNumber, 
                amount
            });
            // Refresh user data after successful transfer
            refreshUserData();
            console.log(response.data); // Handle success response
            setTransferData({
                fromAccountNumber: '',
                toAccountNumber: '',
                amount: '',
            });
            setSuccessModal(true); // Show success modal
            // Optionally update local state or trigger a refresh of account data
        } catch (error) {
            handleError(error); // Handle error response
        }
        
    };

    const handleError = (error: unknown) => {
        let errorMessage = 'An unexpected error occurred. Please try again later.';
        
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data && typeof error.response.data.message === 'string') {
                errorMessage = error.response.data.message;
            }
        }

        console.error('Payment error:', errorMessage);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.currentTarget;
        setTransferData(prevState => ({
            ...prevState,
            [name]: value, // Update with accountNumber
        }));
    };

    console.log(transferData.fromAccountNumber);
    console.log(transferData.toAccountNumber);
    console.log(transferData.amount);

    return (
        <div>
            <h2>Transfer Funds</h2>
            <div>
                <label htmlFor="fromAccountNumber">From Account:</label>
                <select 
                    id="fromAccountNumber"
                    name="fromAccountNumber"
                    onChange={handleChange}
                    value={transferData.fromAccountNumber}
                >
                    <option value="">Select Account</option>
                    {user!.accounts.map((account) => (
                        <option key={account._id} value={account.accountType}>{account.accountType}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="toAccountNumber">To Account:</label>
                <select 
                    id="toAccountNumber"
                    name="toAccountNumber"
                    onChange={handleChange}
                    value={transferData.toAccountNumber}
                >
                    <option value="">Select Account</option>
                    {user!.accounts.map((account) => (
                        <option key={account._id} value={account.accountType}>{account.accountType}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={transferData.amount}
                    onChange={handleChange}
                    placeholder="Enter Amount"
                />
            </div>
            <button onClick={handleTransfer}>Transfer</button>

            {/* Modal for error message */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-md max-w-sm">
                        <h2 className="text-xl font-bold mb-4">Error</h2>
                        <p className="mb-4">{message}</p>
                        <button onClick={() => setShowModal(false)} className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors duration-200">Close</button>
                    </div>
                </div>
            )}

            {/* Modal for success message */}
            {successModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-md max-w-sm">
                        <h2 className="text-xl font-bold mb-4">Success</h2>
                        <p className="mb-4">Transfer completed successfully!</p>
                        <button onClick={() => setSuccessModal(false)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransferFunds;
