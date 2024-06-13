import { NavBar } from "../components";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome to Our Bank
                </h1>
                <p className="mt-2 text-lg text-gray-600">Your financial partner for a secure and prosperous future.</p>
                </div>
            </header>

            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900">Checking Accounts</h2>
                        <p className="mt-2 text-gray-600">Manage your daily transactions with ease and confidence.</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900">Savings Accounts</h2>
                        <p className="mt-2 text-gray-600">Grow your wealth with competitive interest rates.</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900">Loans</h2>
                        <p className="mt-2 text-gray-600">Flexible loan options to meet your needs.</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900">Credit Cards</h2>
                        <p className="mt-2 text-gray-600">Convenience and rewards in one card.</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900">Investments</h2>
                        <p className="mt-2 text-gray-600">Plan for your future with our expert advice.</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900">Customer Support</h2>
                        <p className="mt-2 text-gray-600">We're here to help you 24/7.</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
