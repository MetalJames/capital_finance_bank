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

    // Handle transfer action
    const handleTransfer = async () => {
        try {
            const response = await axiosInstance.post('/transfer', transferData);
            // Refresh user data after successful transfer
            refreshUserData();
            console.log(response.data); // Handle success response
            // Optionally update local state or trigger a refresh of account data
        } catch (error) {
            console.error('Transfer error:', error.response.data); // Handle error response
        }
        setTransferData({
            fromAccountNumber: '',
            toAccountNumber: '',
            amount: '',
        })
    };

    const handleChange = (e) => {
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
                    {user.accounts.map((account) => (
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
                    {user.accounts.map((account) => (
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
                    onChange={handleChange}
                    placeholder="Enter Amount"
                />
            </div>
            <button onClick={handleTransfer}>Transfer</button>
        </div>
    );
};

export default TransferFunds;
