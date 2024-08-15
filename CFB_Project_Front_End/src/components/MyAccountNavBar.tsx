import { Link, useLocation } from 'react-router-dom';

const MyAccountNavBar = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        const currentPath = location.pathname;
        return currentPath === path || (path === "/myaccount/personal_details" && currentPath.startsWith("/myaccount/personal_details"));
    };

    return (
        <div>
            <Link to="personal_details">
                <p className={`${isActive("/myaccount/personal_details") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                } text-black inline-flex items-center px-5 pt-1 text-sm font-medium`}>
                    Personal Details
                </p>
            </Link>
            <Link to="account_summary">
                <p className={`${isActive("/myaccount/account_summary") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                } text-black inline-flex items-center px-5 pt-1 text-sm font-medium`}>
                    Account Summary
                </p>
            </Link>
            <Link to="transaction_history">
                <p className={`${isActive("/myaccount/transaction_history") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                } text-black inline-flex items-center px-5 pt-1 text-sm font-medium`}>
                    Transaction History
                </p>
            </Link>
            <Link to="recent_activities">
                <p className={`${isActive("/myaccount/recent_activities") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                } text-black inline-flex items-center px-5 pt-1 text-sm font-medium`}>
                    Recent Activities
                </p>
            </Link>
            <Link to="transfer_funds">
                <p className={`${isActive("/myaccount/transfer_funds") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                } text-black inline-flex items-center px-5 pt-1 text-sm font-medium`}>
                    Transfer Funds
                </p>
            </Link>
            <Link to="make_a_payment">
                <p className={`${isActive("/myaccount/make_a_payment") ? "text-white border-b-2 border-white" : "text-gray-500 border-transparent"
                } text-black inline-flex items-center px-5 pt-1 text-sm font-medium`}>
                    Make a Payment
                </p>
            </Link>
        </div>
    );
}

export default MyAccountNavBar;
