import { useState } from "react";
import { Transaction } from "../types/type";

type Props = {
    transactions: Transaction[];
};

const TransactionHistory = ({ transactions }: Props) => {

    //Filter for transaction startrs here

    const [selectedAccountType, setSelectedAccountType] = useState<string | 'All'>('All');

    // Filter transactions based on selected account type
    const filteredTransactions = selectedAccountType === 'All'
        ? transactions
        : transactions.filter(transaction => transaction.accountType === selectedAccountType);

    if (!transactions) return <h1>No Transactions</h1>;

    return (
        <div className="mt-4 border border-gray-300 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Transaction History</h2>

            {/* Filter buttons */}
            <div className="mb-4">
                <button
                    onClick={() => setSelectedAccountType('All')}
                    className={`mr-2 px-4 py-2 rounded ${selectedAccountType === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    All Transactions
                </button>
                <button
                    onClick={() => setSelectedAccountType('Checking')}
                    className={`mr-2 px-4 py-2 rounded ${selectedAccountType === 'Checking' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Checking
                </button>
                <button
                    onClick={() => setSelectedAccountType('Saving')}
                    className={`mr-2 px-4 py-2 rounded ${selectedAccountType === 'Saving' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Saving
                </button>
                <button
                    onClick={() => setSelectedAccountType('Credit')}
                    className={`px-4 py-2 rounded ${selectedAccountType === 'Credit' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Credit
                </button>
            </div>

            <ul className="divide-y divide-gray-300">
                {filteredTransactions.map((transaction) => (
                <li key={transaction.id} className="py-2">
                    <p className="text-sm">
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
        </div>
    );
};

export default TransactionHistory;
