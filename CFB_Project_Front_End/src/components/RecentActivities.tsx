type Activity = {
    id: number;
    date: string;
    description: string;
};

type Props = {
    activities: Activity[];
};

const RecentActivities = ({ activities }: Props) => {

    if (!activities) return <h1>No Activities.</h1>;

    return (
        <div className="mt-4 border border-gray-300 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
            <ul className="divide-y divide-gray-300">
                {activities.map((activity) => (
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
