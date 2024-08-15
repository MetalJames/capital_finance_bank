import { useState } from 'react';
import { Account } from '../types/type';
import DepositMoneyModal from './DepositMoneyModal';

type AccountProps = {
    accounts: Account[];
};

const AccountSummary = ({ accounts }: AccountProps) => {

    // Modal for deposit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<string>('');

    const openModal = (accountType: string) => {
        setSelectedAccount(accountType);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAccount('');
    };

    if (!accounts) return <h1>No Activities.</h1>;

    return (
        <div className="mt-4 border border-gray-300  bg-[#EADBC8] p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Account Summary</h2>
            {accounts.map((account, index) => (
                <div key={index} className="mb-4">
                    <p>
                        <span className="font-semibold">Account Type:</span> {account.accountType}
                    </p>
                    <p>
                        <span className="font-semibold">Account Number:</span> {account.accountNumber}
                    </p>
                    <p>
                        <span className="font-semibold">Balance:</span> ${account.balance.toFixed(2)}
                    </p>
                    <p>
                        <span className="font-semibold">Open Date:</span> {account.openDate}
                    </p>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                        onClick={() => openModal(account.accountType)}
                    >
                        Deposit Money
                    </button>
                    {index !== accounts.length -1 &&  <hr className="border-gray-400 my-4" />}
                </div>
            ))}
            {isModalOpen && (
                <DepositMoneyModal
                    accountType={selectedAccount}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default AccountSummary;
