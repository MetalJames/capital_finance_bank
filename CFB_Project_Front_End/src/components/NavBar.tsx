import { Link, useLocation } from "react-router-dom"
import { BiUser } from "react-icons/bi";
import Logo from "../assets/CFB_Logo_Updated.png"

const NavBar = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
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
                            
                            <Link to={"/login"}><BiUser className="h-6 w-6 mr-1 inline-flex image-center" style={{ fill: '#3B8CD5', stroke: '#3B8CD5', strokeWidth: 1 }}/>
                            <p className={`${isActive("/login") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                                }"text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium`}>
                                     Login</p></Link>
                            
                        </div> 
                                </div>
            </div>
            </nav>
        </div>
    )
}

export default NavBar