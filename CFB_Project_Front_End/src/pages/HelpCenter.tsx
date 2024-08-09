import { Link,  } from "react-router-dom"
import image from "../assets/You are welcome image.png";
import truck from "../assets/truck logo.png";
import myAccount from "../assets/My Account.png";
import ratesAndCurrency from "../assets/Rates and Currency.png";
import cardsAndCheque from "../assets/Cards And Cheque.png"
import bank from "../assets/bank.jpg"

const HelpCenter = () => {
    return (
        <div className="min-h-screen bg-[#FEFAF6] flex flex-col">
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
             <div className="px-1 sm:px-6">
             <div className="border-1 border-dashed py-6 bg-[#102C57] rounded-lg grid grid-cols-2 gap-40 sm:grid-cols-2 lg:grid-cols-2 sm:px-1 lg:px-1 p-1">
             <div className="h-30 max-w-xl  sm:px-1 lg:px-20 ">
             <h2 className="text-2xl font-bold text-white">
             Help Center
                </h2>
                <p className ="text-white"> Find what you are looking for </p> 
        
                <input type = "text" placeholder="Search..."className="bg-white text-black placeholder-gray  px-1 py-2 border border-gray-300 w-80"/> 

                </div>
                <div className = "flex-shrink-0 rounded-lg sm:px-20 lg:px-40 bg-blend-normal ">
                <img className="h-30 w-40 rounded-lg " src={bank} alt="Bank"/>
                </div>
                </div>
                
                <div className="h-40 bg-[#EADBC8] py-6 p-6">
                    <h2 className ="text-2xl text-black font-bold text-center ">
                        Popular Services
                    </h2>
                    <div className = "grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-8 sm:px-10 lg:px-10 p-4">
                    <div className="bg-white shadow rounded-lg   w-40 h-20">
                    <p className="text-gray-900 p-2 text-center  cursor-pointer">View and Print</p>
                    <p className="text-gray-900 p-1 text-center  cursor-pointer">Void Cheque</p>
                    </div>
                    <div className="bg-white shadow rounded-lg w-40 h-20">
                    <p className="text-gray-900 p-2 text-center  cursor-pointer">View Payment</p>
                    <p className="text-gray-900 p-1 text-center  cursor-pointer">History</p>
                    </div>
                    <div className="bg-white shadow rounded-lg w-40 h-20">
                    <p className="text-gray-900 p-2 text-center  cursor-pointer">View Credit</p>
                    <p className="text-gray-900 p-1 text-center  cursor-pointer">Score</p>
                      </div>
                    <div className="bg-white shadow rounded-lg w-40 h-20">
                    <p className="text-gray-900 p-6 text-center  cursor-pointer ">Access Rewards</p>
                    </div>
                    </div>
                </div> 
                <div className="h-40 bg-[#EADBC8] py-6 p-6">
             
                <div className="bg-white shadow rounded-lg w-45 h-10">
                <h2 className="text-gray-900 p-1 text-center font-bold text-2xl ">Helpful Links</h2>
                </div>
                <div className = "grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-8 sm:px-10 lg:px-10 p-4">
                <div className="  flex-shrink-0 rounded-lg sm:px-5 lg:px-10">
                <img className="h-30 w-40 rounded-lg  cursor-pointer" src={truck} alt="Payments and Transfer"/>
                <p className = "text-gray-900 px-1  cursor-pointer">Payment and Transfer</p>
                    </div>
                    <div className="  flex-shrink-0 rounded-lg sm:px-5 lg:px-10">
                    <Link to={"/myaccount"}><img className="h-30 w-40 rounded-lg  cursor-pointer" src={myAccount} alt="My Account"/>
                <p className = "text-gray-900 px-8  cursor-pointer">My Account</p></Link>
                    </div>
                      <div className="  flex-shrink-0 rounded-lg sm:px-5 lg:px-10">
                <img className="h-30 w-40 rounded-lg  cursor-pointer" src={ratesAndCurrency} alt="Rates And Currency"/>
                <p className = "text-gray-900 px-3  cursor-pointer">Rates And Currency</p>
                    </div>
                    <div className="  flex-shrink-0 rounded-lg sm:px-5 lg:px-10">
                <img className="h-30 w-40 rounded-lg  cursor-pointer" src={cardsAndCheque} alt="Cards And Cheque"/>
                <p className = "text-gray-900 px-3  cursor-pointer">Cards And Cheques</p>
                    </div>
                    </div>
                </div>
                <div className="h-40 bg-[#EADBC8] py-6 p-6">
                    </div>
                </div> 
             </main>
             <div className="flex-grow"></div>
          
        </div>
    )
}

export default HelpCenter