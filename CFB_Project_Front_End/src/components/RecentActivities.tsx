import { useState } from "react";
import { Activity } from "../types/type";

type Props = {
    activities: Activity[];
};

const RecentActivities = ({ activities }: Props) => {

    //Filter for activities startrs here
    const [selectedAccountType, setSelectedAccountType] = useState<string | 'All'>('All');

    // Filter transactions based on selected account type
    const filteredActivities = selectedAccountType === 'All'
        ? activities
        : activities.filter(activity => activity.accountType === selectedAccountType);

    if (!activities) return <h1>No Activities.</h1>;

    return (
        <div className="mt-4 border border-gray-300 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>

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
                {filteredActivities.map((activity) => (
                <li key={activity.id} className="py-2">
                    <p className="text-sm">
                        <span className="font-semibold">Date:</span> {activity.date}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Description:</span> {activity.description}
                    </p>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivities;
