type Props = {
    name: string;
    email: string;
    phone: string;
    address: string;
};

const PersonalDetails = ({ name, email, phone, address }: Props) => {
    return (
        <div className="border border-gray-300 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
            <p>
                <span className="font-semibold">Name:</span> {name}
            </p>
            <p>
                <span className="font-semibold">Email:</span> {email}
            </p>
            <p>
                <span className="font-semibold">Phone:</span> {phone}
            </p>
            <p>
                <span className="font-semibold">Address:</span> {address}
            </p>
        </div>
    );
};

export default PersonalDetails;
