type Transaction = {
    id: number;
    date: string;
    description: string;
    amount: number;
};

type Props = {
    transactions: Transaction[];
};

const TransactionHistory = ({ transactions }: Props) => {

    if (!transactions) return <h1>No Transactions</h1>;

    return (
        <div className="mt-4 border border-gray-300 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
            <ul className="divide-y divide-gray-300">
                {transactions.map((transaction) => (
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
