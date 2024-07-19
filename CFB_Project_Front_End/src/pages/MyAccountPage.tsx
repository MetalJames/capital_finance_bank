import { Link } from "react-router-dom";
import { AccountSummary, PersonalDetails, RecentActivities, TransactionHistory } from "../components";
import TransferFunds from "../components/TransferFunds";
import MakeAPayment from "../components/MakeAPayment";
import useUserContext from "../hooks/useUserContext";


const MyAccountPage: React.FC = () => {
  // Example data (replace with actual fetched data)
    const { user } = useUserContext();
    console.log(user);

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
                    <TransactionHistory transactions={user.transactions} />
                    <AccountSummary accounts={user.accounts} />
                    <RecentActivities activities={user.activities} />


                    <TransferFunds />
                    <MakeAPayment />






                









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
