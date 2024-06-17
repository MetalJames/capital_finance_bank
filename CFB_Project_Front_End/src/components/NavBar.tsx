import { Link } from "react-router-dom"
import Logo from "../assets/logo.svg"

const NavBar = () => {
    return (
        <div>
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex-shrink-0">
                            <img className="h-16 w-16" src={Logo} alt="Bank Logo" />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to={"/"}><p className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Home</p></Link>
                            <Link to={"aboutus"}><p className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">About</p></Link>
                            <Link to={"contactus"}><p className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">Contact</p></Link>
                            <Link to={"myaccount"}><p className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">My Account</p></Link>
                        </div>
                    </div>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar