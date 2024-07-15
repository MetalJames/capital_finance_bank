import { Link, useLocation, useNavigate } from "react-router-dom"
import { BiUser } from "react-icons/bi";
import Logo from "../assets/CFB_Logo_Updated.png"
import { useState } from "react";
//import { useContext, useState } from "react";
//import UserContext from "../context/UserContext";
import useUserContext from "../hooks/useUserContext";

const NavBar = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [modalMessage, setModalMessage] = useState(''); // State to hold modal message

    const handleLogout = () => {
        setShowModal(true);
        setModalMessage("Logging you out...");

        // Redirect after 1.5 seconds
        setTimeout(() => {
            setUser(null); // Clear user data on logout
            navigate("/");
            setShowModal(false);
        }, 1500);
    };

    return (
        <div>
            <nav className="bg-[#102C57] shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-8">
                        <div className="flex-shrink-0 pt-6">
                            <Link to={"/"} className="cursor-pointer">
                                <img className="h-15 w-16 inline-flex image-center" src={Logo} alt="Bank Logo"/>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to={"/"}><p className={`${isActive("/") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                                }"text-white inline-flex items-center px-1 pt-1 text-sm font-medium`}>Home</p></Link>
                            <Link to={"myaccount"}><p className={`${isActive("/myaccount") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                                }"text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium`}>My Accounts</p></Link>
                            <Link to={"aboutus"}><p className={`${isActive("/aboutus") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                                }"text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium`}>Learn</p></Link>
                        </div>
                    </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                            <Link to={"/contactus"}><p className={`${isActive("/contactus") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                                }"text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium`}>Contact Us</p></Link>
                            {user ? (
                                <div className="text-gray-500">
                                    <p className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                                        Welcome, {user.firstName}
                                    </p>
                                    <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to={"/login"}><BiUser className="h-6 w-6 mr-1 inline-flex image-center" style={{ fill: '#3B8CD5', stroke: '#3B8CD5', strokeWidth: 1 }}/>
                                    <p className={`${isActive("/login") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                                        }"text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium`}>
                                        Login</p>
                                </Link>
                            )}
                            
                        </div> 
                        {/* Modal for success message */}
                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white p-4 rounded-lg shadow-md max-w-sm">
                                    <h2 className="text-xl font-bold mb-4">See You!</h2>
                                    <p className="mb-4">{modalMessage}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar