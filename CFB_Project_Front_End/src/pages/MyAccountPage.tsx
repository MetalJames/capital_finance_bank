import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AccountSummary, PersonalDetails, RecentActivities, TransactionHistory } from "../components";
import UserContext from "../context/UserContext";

const MyAccountPage: React.FC = () => {
  // Example data (replace with actual fetched data)
    const { user } = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accountNumber] = useState("1234567890");
    const [balance] = useState(5000);
    const [accountType] = useState("Checking");
    const [openDate] = useState("2022-01-01");
    const [name] = useState("John Doe");
    const [email] = useState("john.doe@example.com");
    const [phone] = useState("123-456-7890");
    const [address] = useState("123 Main St, Anytown, USA");
    const [transactions, setTransactions] = useState([
        { id: 1, date: "2023-06-01", description: "Grocery Store", amount: -54.23 },
        { id: 2, date: "2023-06-02", description: "Salary", amount: 2000.00 },
        { id: 3, date: "2023-06-03", description: "Electricity Bill", amount: -123.45 },
    ]);
    const [activities] = useState([
        { id: 1, date: "2023-06-01", description: "Logged in from IP 123.456.789.000" },
        { id: 2, date: "2023-06-02", description: "Transferred $200 to Savings" },
        { id: 3, date: "2023-06-03", description: "Changed password" },
    ]);


    console.log(user);




    // const [accountNumber, setAccountNumber] = useState("1234567890");
    // const [balance, setBalance] = useState(5000);
    // const [accountType, setAccountType] = useState("Checking");
    // const [openDate, setOpenDate] = useState("2022-01-01");
    // const [name, setName] = useState("John Doe");
    // const [email, setEmail] = useState("john.doe@example.com");
    // const [phone, setPhone] = useState("123-456-7890");
    // const [address, setAddress] = useState("123 Main St, Anytown, USA");
    // const [transactions, setTransactions] = useState([
    //     { id: 1, date: "2023-06-01", description: "Grocery Store", amount: -54.23 },
    //     { id: 2, date: "2023-06-02", description: "Salary", amount: 2000.00 },
    //     { id: 3, date: "2023-06-03", description: "Electricity Bill", amount: -123.45 },
    // ]);
    // const [activities, setActivities] = useState([
    //     { id: 1, date: "2023-06-01", description: "Logged in from IP 123.456.789.000" },
    //     { id: 2, date: "2023-06-02", description: "Transferred $200 to Savings" },
    //     { id: 3, date: "2023-06-03", description: "Changed password" },
    // ]);





    // Example useEffect to fetch transactions
    useEffect(() => {
        // Example fetch call (replace with actual fetch logic)
        const fetchTransactions = async () => {
        try {
            // Simulating fetching transactions from an API
            const response = await fetch("/api/transactions");
            const data = await response.json();
            setTransactions(data.transactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
        };

        fetchTransactions();
    }, []);

    useEffect(() => {
        // Example check if user is logged in 
        const checkLoggedIn = () => {
            // Example check
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            if (isLoggedIn === "true") {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold mb-4">My Account</h1>
            {/* {isLoggedIn ? (
                <div className="grid grid-cols-1 gap-4">
                    <PersonalDetails name={name} email={email} phone={phone} address={address} />
                    <AccountSummary accountNumber={accountNumber} balance={balance} accountType={accountType} openDate={openDate} />
                    <TransactionHistory transactions={transactions} />
                    <RecentActivities activities={activities} />
                </div>
            ) : (
                <div className="text-center">
                    <p className="mb-4">You are not logged in. Please log in to view your account.</p>
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block">Log In</Link>
                </div>
            )} */}
            {user ? (
                <div className="grid grid-cols-1 gap-4">
                    <PersonalDetails 
                        name={`${user.firstName} ${user.lastName}`}
                        email={user.email}
                        phone={user.phone}
                        address={`${user.unitNumber ? user.unitNumber + ", " : ""}${user.streetAddress}, ${user.city}, ${user.province}, ${user.postalCode}`}
                    />
                </div>
            ) : (
                <div className="text-center">
                    <p className="mb-4">You are not logged in. Please log in to view your account.</p>
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block">Log In</Link>
                </div>
            )}
        </div>
    );
};

export default MyAccountPage;
