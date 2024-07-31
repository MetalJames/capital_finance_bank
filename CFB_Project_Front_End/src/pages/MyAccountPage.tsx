import { Link } from "react-router-dom";
import { MyAccountNavBar, AccountSummary, PersonalDetails, RecentActivities, TransactionHistory, TransferFunds, MakeAPayment } from "../components";
import useUserContext from "../hooks/useUserContext";
import { Route, Routes } from "react-router-dom";


const MyAccountPage = () => {
    const { user, refreshUserData } = useUserContext();

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold mb-4">My Account</h1>
            {user ? (
                <div className="grid grid-cols-1 gap-4">
                    <header>
                        <MyAccountNavBar />
                    </header>
                    <Routes>
                        <Route path="personal_details" element={<PersonalDetails
                            firstName={user.firstName} 
                            lastName={user.lastName}
                            email={user.email}
                            phone={user.phone}
                            unitNumber={user.unitNumber ? user.unitNumber : ""}
                            streetAddress={user.streetAddress}
                            city={user.city}
                            province={user.province}
                            postalCode={user.postalCode}
                            updateUser={refreshUserData}
                        />} />
                        <Route path="transaction_history" element={<TransactionHistory transactions={user.transactions} />} />
                        <Route path="account_summary" element={<AccountSummary accounts={user.accounts} />} />
                        <Route path="recent_activities" element={<RecentActivities activities={user.activities} />} />
                        <Route path="transfer_funds" element={<TransferFunds />} />
                        <Route path="make_a_payment" element={<MakeAPayment />} />
                    </Routes>
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
