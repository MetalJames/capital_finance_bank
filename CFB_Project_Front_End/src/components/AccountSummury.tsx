type Props = {
    accountNumber: string;
    balance: number;
    accountType: string;
    openDate: string;
};

const AccountSummary = ({ accountNumber, balance, accountType, openDate }: Props) => {
    return (
        <div className="border border-gray-300 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Account Summary</h2>
            <p>
                <span className="font-semibold">Account Number:</span> {accountNumber}
            </p>
            <p>
                <span className="font-semibold">Balance:</span> ${balance.toFixed(2)}
            </p>
            <p>
                <span className="font-semibold">Account Type:</span> {accountType}
            </p>
            <p>
                <span className="font-semibold">Open Date:</span> {openDate}
            </p>
        </div>
    );
};

export default AccountSummary;
