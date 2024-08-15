import { Link } from "react-router-dom";
import { MyAccountNavBar, AccountSummary, PersonalDetails, RecentActivities, TransactionHistory, TransferFunds, MakeAPayment } from "../components";
import person_image from  "../assets/Accout_holder_image2.png"
import useUserContext from "../hooks/useUserContext";
import { Route, Routes } from "react-router-dom";


const MyAccountPage = () => {
    const { user, refreshUserData } = useUserContext();

    return (
        <div className="min-h-screen bg-white flex flex-col">
             <header className="bg-white py-4">
                <div className="max-w-8xl mx-auto px-1 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-5xl font-bold text-gray-900">
                    Capital Finance Bank
                </h1>
                </div>
                <p className="text-lg px-4 sm:px-0 lg:px-8 italic text-gray-600">Your financial partner for a secure and prosperous future.</p>
            </header>
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto sm:px-8 lg:px-8">
                    <div className="px-0 sm:px-0">
                        {user ? (
                            <div className="grid grid-cols-1 gap-5">
                                <header>
                                <div className="border-1 border-dashed bg-[#102C57] rounded-lg py-2">
                                <div className="max-w-9xl mx-auto px-6 sm:px-6 lg:px-8 flex justify-between items-center  ">
                                    <MyAccountNavBar />
                                    <div className="flex-shrink-0">
                                    <img className="h-12 w-12 " src={person_image} alt="Person Image"/>
                                    </div>
                                </div>
                                </div>
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
                                    <Route path="account_summary" element={<AccountSummary accounts={user.accounts} />} />
                                    <Route path="transaction_history" element={<TransactionHistory transactions={user.transactions} />} />
                                    <Route path="recent_activities" element={<RecentActivities activities={user.activities} />} />
                                    <Route path="transfer_funds" element={<TransferFunds />} />
                                    <Route path="make_a_payment" element={<MakeAPayment />} />
                                </Routes>
                                </div>                        
                        ) : (
                        <div className="border-1 border-dashed bg-[#EADBC8] rounded-lg py-48">
                        <div className="text-center">
                            <p className="mb-4">You are not logged in. Please log in to view your account.</p>
                            <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block">Log In</Link>
                        </div>
                        </div>
                        )}
                        
                    </div>
                </div>
            </main>

        </div>
    );
};

export default MyAccountPage;