import { UpdateDetailsModalProps } from '../types/type';

const UpdateDetailsModal = ({ isOpen, formData, handleChange, handleSubmit, closeModal, getErrorMessage, message }: UpdateDetailsModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
            <div className="bg-white p-6 rounded-md w-full max-w-lg">
                <h3 className="text-lg font-bold mb-4">Update Details</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        {getErrorMessage('name')}
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        {getErrorMessage('name')}
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        {getErrorMessage('phone')}
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Unit Number</label>
                        <input
                            type="text"
                            name="unitNumber"
                            value={formData.unitNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        {getErrorMessage('unitNumber')}
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Street Address</label>
                        <input
                            type="text"
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        {getErrorMessage('streetAddress')}
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        {getErrorMessage('city')}
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Province</label>
                        <input
                            type="text"
                            name="province"
                            value={formData.province}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        {getErrorMessage('province')}
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        {getErrorMessage('postalCode')}
                    </div>
                    {message && (
                        <div className="my-1 text-red-500 text-xs">
                            {message}
                        </div>
                    )}
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-blue-700 text-white p-2 rounded hover:bg-blue-900 transition-colors duration-200">Save Changes</button>
                        <button type="button" onClick={closeModal} className="ml-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition-colors duration-200">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default UpdateDetailsModal;
