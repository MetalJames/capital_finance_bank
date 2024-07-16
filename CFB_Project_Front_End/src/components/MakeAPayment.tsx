import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

const MakeAPayment = () => {

    const { refreshUserData } = useContext(UserContext);

    // Create Axios instance with base URL
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api', // Adjust as per your backend server setup
    });

    //activity
    const [activity, setActivity] = useState({
        fromAccountNumber: '',
        amountActivity: 0,
    });

    const handleActivity = async () => {
        try {
            const response = await axiosInstance.post('/activity', activity);
            refreshUserData();
            console.log(response.data);
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

    const handleChangeActivity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setActivity({ ...activity, [name]: name === 'amountActivity' ? Number(value) : value });
    };

    return (
        <div>
            <div>
                <h2>Pay Your Bill</h2>
                <div>
                    <label htmlFor="fromAccountNumberActivity">From Account:</label>
                    <input
                        type="text"
                        id="fromAccountNumberActivity"
                        name="fromAccountNumber"
                        value={activity.fromAccountNumber}
                        onChange={handleChangeActivity}
                    />
                </div>
                <div>
                    <label htmlFor="amountActivity">Amount:</label>
                    <input
                        type="number"
                        id="amountActivity"
                        name="amountActivity"
                        value={activity.amountActivity}
                        onChange={handleChangeActivity}
                    />
                </div>
                <button onClick={handleActivity}>Pay</button>
            </div>
        </div>
    )
}

export default MakeAPayment