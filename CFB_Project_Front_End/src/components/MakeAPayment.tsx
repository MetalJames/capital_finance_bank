import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

const MakeAPayment = () => {

    const { user, refreshUserData } = useContext(UserContext);

    // Create Axios instance with base URL
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api', // Adjust as per your backend server setup
    });

    //activity
    const [activity, setActivity] = useState({
        fromAccountNumber: '',
        amount: '',
        description: '',
    });

    // State for modal
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [successModal, setSuccessModal] = useState(false);

    const handleActivity = async () => {
        const fromAccount = user!.accounts.find(acc => acc.accountType === activity.fromAccountNumber);
        const amount = parseFloat(activity.amount);

        if (fromAccount && fromAccount.balance < amount) {
            setMessage('Insufficient funds. The payable amount is greater than the available balance.');
            setShowModal(true);
            return;
        }

        try {
            const response = await axiosInstance.post('/activity', { 
                fromAccountNumber: activity.fromAccountNumber, 
                amount: amount, // Correctly passing the amount from state
                description: activity.description
            });
            refreshUserData();
            console.log(response.data);
            setActivity({
                fromAccountNumber: '',
                amount: '',
                description: '',
            });
            setSuccessModal(true); // Show success modal
        } catch (error) {
            handleError(error);
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

    const handleChangeActivity = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setActivity({ ...activity, [name]: name === 'amount' ? value : value }); // Adjusted for 'amount' name
    };

    return (
        <div>
            <div>
                <h2>Pay Your Bill</h2>
                <div>
                    <label htmlFor="fromAccountNumber">From Account:</label>
                    <select 
                        id="fromAccountNumber"
                        name="fromAccountNumber"
                        onChange={handleChangeActivity}
                        value={activity.fromAccountNumber}
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
                        value={activity.amount}
                        step="0.01" // Allow decimal amounts
                        onChange={handleChangeActivity}
                        placeholder="Enter Amount"
                    />
                </div>
                <div>
                    <label htmlFor="descriptionActivity">Description:</label>
                    <input
                        type="text"
                        id="descriptionActivity"
                        name="description"
                        value={activity.description}
                        onChange={handleChangeActivity}
                    />
                </div>
                <button onClick={handleActivity}>Pay</button>

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
        </div>
    )
}

export default MakeAPayment