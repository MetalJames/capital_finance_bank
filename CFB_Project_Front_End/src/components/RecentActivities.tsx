import { Activity } from "../types/type";
import { useState } from "react";

type Props = {
    activities: Activity[];
};

const RecentActivities = ({ activities }: Props) => {
    // display only 10 latest activities
    const [visibleCount, setVisibleCount] = useState(10);

    if (!activities || activities.length === 0) return <h1>No Activities.</h1>;
    const sortedActivities = [...activities].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    //show the first 10 activities
    const visibleActivities = sortedActivities.slice(0, visibleCount);

    // load more function
    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };
    return (
        <div className="mt-4 border border-gray-300  bg-[#EADBC8] p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Recent Activities</h2>
            <ul className="divide-y divide-gray-400">
                {visibleActivities.map((activity) => (
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
            {visibleCount < sortedActivities.length && (
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

export default RecentActivities;
