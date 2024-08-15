import { Transaction } from "../types/type";
import { useState } from "react";

type Props = {
    transactions: Transaction[];
};

const TransactionHistory = ({ transactions }: Props) => {
    const [visibleCount, setVisibleCount] = useState(10);

    if (!transactions || transactions.length === 0) return <h1>No Transactions</h1>;
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    //show the first 10 activities
    const visibleTransactions = sortedTransactions.slice(0, visibleCount);

    // load more function
    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };
    return (
        <div className="mt-4 border border-gray-300   bg-[#EADBC8] p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Transaction History</h2>
            <ul className="divide-y divide-gray-400 my-2">
                {visibleTransactions .map((transaction) => (
                <li key={transaction.id} className="py-2 ">
                    <p className="text-sm ">
                    <span className="font-semibold">Date:</span> {transaction.date}
                    </p>
                    <p className="text-sm">
                    <span className="font-semibold">Description:</span>{" "}
                    {transaction.description}
                    </p>
                    <p className="text-sm">
                    <span className="font-semibold">Amount:</span> $
                    {transaction.amount.toFixed(2)}
                    </p>
                </li>
                ))}
            </ul>
            {visibleCount < sortedTransactions.length && (
                <button 
                    onClick={loadMore} 
                    className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md"
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default TransactionHistory;
