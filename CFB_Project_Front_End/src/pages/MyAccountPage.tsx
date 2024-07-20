import { Link } from "react-router-dom";
import { AccountSummary, PersonalDetails, RecentActivities, TransactionHistory } from "../components";
import person_image from  "../assets/Accout_holder_image2.png"
import TransferFunds from "../components/TransferFunds";
import MakeAPayment from "../components/MakeAPayment";
import useUserContext from "../hooks/useUserContext";


const MyAccountPage: React.FC = () => {
  // Example data (replace with actual fetched data)
    const { user } = useUserContext();
    console.log(user);

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
                        <div className="border-1 border-dashed bg-[#102C57] rounded-lg py-4">
                            <div className="max-w-9xl mx-auto px-6 sm:px-6 lg:px-8 flex justify-between items-center  ">
                                <p className="text-2xl font-bold text-white">My Account</p>
                                <div className="flex-shrink-0">
                                    <img className="h-12 w-12 " src={person_image} alt="Person Image"/>
                                </div>
                            </div>
                        </div>
                        
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
                        )} */
                        }


                        {user ? (
                        <div className="border-1 border-dashed bg-[#EADBC8] rounded-lg">
                        <div className="grid grid-cols-1 gap-3">
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