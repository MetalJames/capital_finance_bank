import { Account } from '../types/type';

type AccountProps = {
    accounts: Account[];
};

const AccountSummary = ({ accounts } : AccountProps) => {

    if (!accounts) return <h1>No Activities.</h1>;
    
    return (
        <div className="mt-4 border border-gray-300  bg-[#EADBC8] p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Account Summary</h2>
            {accounts.map((account, index) => (
                <div key={index} className="mb-2">
                    <p>
                        <span className="font-semibold">Account Type:</span> {account.accountType}
                    </p>
                    <p>
                        <span className="font-semibold">Account Number:</span> {account.accountNumber}
                    </p>
                    <p>
                        <span className="font-semibold">Balance:</span> ${account.balance}
                    </p>
                    <p>
                        <span className="font-semibold">Open Date:</span> {account.openDate}
                    </p>
                    {index !== accounts.length -1 &&  <hr className="border-[#102C57] my-4" />}
                </div>
            ))}
        </div>
    );
};

export default AccountSummary;