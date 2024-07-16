import { Link} from "react-router-dom"
import image from "../assets/You are welcome image.png"
import landing_image from  "../assets/landing_Page_IMage.png"
import { BiUser } from "react-icons/bi";
import { BiHome } from "react-icons/bi";
import { BiSupport} from "react-icons/bi";
import { BiStar} from "react-icons/bi";
import { BiCreditCard} from "react-icons/bi";
const Home = () => {
    return (
        <div className="min-h-screen bg-[#EADBC8] flex flex-col">
            <header className="bg-white shadow">
                <div className="max-w-8xl mx-auto px-1 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-5xl font-bold text-gray-900">
                    Capital Finance Bank
                </h1>
                <div className="flex-shrink-0">
                    <img className="h-24 w-24" src={image} alt="Welcome Logo"/>
                </div>
                </div>
                <p className="text-lg px-4 sm:px-0 lg:px-8 italic text-gray-600">Your financial partner for a secure and prosperous future.</p>
            </header>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-11 sm:px-2 lg:px-2">
                <div className="px-6 sm:px-6">
                    <div className="border-1 border-dashed py-6 bg-[#102C57] rounded-lg">
                        <div className="mx-auto px-4 flex items-center justify-center">
                            <p className="text-lg font-bold items-center text-white">GET OFFERS AND DISCOUNTS USING CFB</p>
                        </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:px-10 lg:px-10 p-4">
                        <div className="flex-shrink-0 rounded-lg sm:px-12 lg:px-17">
                            <img className="h-80 w-84 rounded-lg" src={landing_image} alt="Landing Page"/>
                        </div>                        
                        <div className="bg-white shadow rounded-lg  p-6 ">
                        <h2 className="text-xl font-semibold italic text-blue-900">** Special Offer</h2>
                        <p className="text-2xl font-bold py-2 text-gray-900">Get 20% offer on every purchase for a month.</p>
                        <p className="mt-2 text-gray-900">Open CFB Account immediately by Signing-in and complete the activation to start shopping now - It is that quick!! </p>
                        <div className=" py-8">
                            <p><Link to="/signup" className= "text-2xl py-3 bg-[#DEAC80]  text-gray-900 font-bold w-full p-2 hover:'#DEAC80' transition-colors duration-200 cursor-pointer ">Sign Up</Link></p>
                        </div>                      
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-36">
                                <BiStar className="h-10 w-16  inline-flex" style={{ fill: '#3B8CD5'}}/>
                                <BiCreditCard className="h-10 w-48 inline-flex" style={{ fill: '#3B8CD5'}}/>
                        </div>
                        <div className="hidden sm:ml-2 sm:flex sm:space-x-24">
                                <p className="text-gray-900 text-xl shadow font-bold">$0 Monthly Fee</p>
                                <p className="text-black font-bold shadow text-xl">Unlimited Transaction</p>
                        </div>
                        </div>
                        <div className="bg-[#102C57] py-6 p-6">
                            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
                                <BiUser className="h-6 w-16  inline-flex" style={{ fill: '#3B8CD5', stroke: '#3B8CD5', strokeWidth: 1 }}/>
                                <BiSupport className="h-6 w-52 inline-flex" style={{ fill: '#3B8CD5', stroke: '#3B8CD5', strokeWidth: 1 }}/>
                                <BiHome className="h-6 w-28 inline-flex" style={{ fill: '#B1A2E0', stroke: '#B1A2E0', strokeWidth: 1 }}/>
                            </div>
                            <div className="hidden sm:ml-8 sm:flex sm:space-x-28">
                                <p><Link to="/login"  className="text-white h-6 w-12 cursor-pointer">Personal</Link></p>
                                <p> <Link to="/contactus"  className="text-white h-6 cursor-pointer">Support</Link></p>
                                <p className="text-white h-6  cursor-pointer">Mortgage</p>
                            </div>
                           
                        </div >
                       
                    </div >
                     
                    </div>
                </div>
                </div>
            </main>
            <div className="flex-grow"></div>
            <footer className="bg-[#102C57] py-4 text-white text-center">
                © 2024 CFB. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
