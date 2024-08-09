import React from 'react';

interface SuccessModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-full max-w-lg">
                <h3 className="text-lg font-semibold mb-4">Success</h3>
                <p className="text-green-600">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
