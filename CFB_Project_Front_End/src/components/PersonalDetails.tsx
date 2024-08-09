import axios from "axios";
import React, { useState } from "react";
import UpdateDetailsModal from "./UpdateDetailsModal";
import SuccessModal from "./SuccessModal";
import { PersonalDetailsProps } from "../types/type";
import { useNavigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import AccountDeletionModal from "./AccountDeletionModal";

const PersonalDetails = ({ firstName, lastName, email, phone, unitNumber, streetAddress, city, province, postalCode, updateUser }: PersonalDetailsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isAccountDeletionModalOpen, setIsAccountDeletionModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        phone: phone || '',
        unitNumber: unitNumber || '',
        streetAddress: streetAddress || '',
        city: city || '',
        province: province || '',
        postalCode: postalCode || '',
    });

    const navigate = useNavigate();
    const { setUser } = useUserContext();

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [message, setMessage] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openSuccessModal = (msg: string) => {
        setMessage(msg);
        setIsSuccessModalOpen(true);
    };
    const closeSuccessModal = () => setIsSuccessModalOpen(false);
    const openAccountDeletionModal = () => setIsAccountDeletionModalOpen(true);
    const closeAccountDeletionModal = () => setIsAccountDeletionModalOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};

        if (!formData.firstName) {
            valid = false;
            newErrors['firstName'] = 'First name is required.';
        }
        if (!formData.lastName) {
            valid = false;
            newErrors['lastName'] = 'Last name is required.';
        }
        if (!formData.phone) {
            valid = false;
            newErrors['phone'] = 'Phone number is required.';
        }
        if (!formData.streetAddress) {
            valid = false;
            newErrors['streetAddress'] = 'Street address is required.';
        }
        if (!formData.city) {
            valid = false;
            newErrors['city'] = 'City is required.';
        }
        if (!formData.province) {
            valid = false;
            newErrors['province'] = 'Province is required.';
        }
        if (!formData.postalCode) {
            valid = false;
            newErrors['postalCode'] = 'Postal code is required.';
        }

        if (!valid) {
            setErrors(newErrors);
        }
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const updatedData = {
                firstName: formData.firstName !== firstName ? formData.firstName : "",
                lastName: formData.lastName !== lastName ? formData.lastName : "",
                phone: formData.phone !== phone ? formData.phone : "",
                unitNumber: formData.unitNumber !== unitNumber ? formData.unitNumber : "",
                streetAddress: formData.streetAddress !== streetAddress ? formData.streetAddress : "",
                city: formData.city !== city ? formData.city : "",
                province: formData.province !== province ? formData.province : "",
                postalCode: formData.postalCode !== postalCode ? formData.postalCode : "",
            };

            await axios.put(`http://localhost:5000/api/user/${encodeURIComponent(email)}`, updatedData);
            updateUser(email);
            closeModal();
            openSuccessModal("Your details have been updated successfully!");
        } catch (error) {
            console.error('Error updating user data:', error);
            setMessage("An error occurred while updating your details. Please try again.");
        }
    };

        const handleDeleteUser = async () => {
            try {
                await axios.delete(`http://localhost:5000/api/user/${encodeURIComponent(email)}`);
                openSuccessModal("Your account was successfully deleted.");
            } catch (error) {
                console.error('Error deleting user:', error);
                setMessage("An error occurred while deleting your account. Please try again.");
            }
        };

        const handleAccountDeletionCompletion = () => {
            closeAccountDeletionModal();
            setUser(null);
            navigate("/");
        };

    const getErrorMessage = (field: string): JSX.Element | null => {
        if (errors[field]) {
            return <p className="text-red-500 text-xs">{errors[field]}</p>;
        }
        return null;
    };

    return (
       
        <div  className=" mt-6 border border-gray-300 bg-[#EADBC8]  p-6 rounded-md">
            <h2 className="text-lg font-bold mb-2">Personal Details</h2>
            <p>
                <span className="font-semibold">Name:</span> {firstName} {lastName}
            </p>
            <p>
                <span className="font-semibold">Email:</span> {email}
            </p>
            <p>
                <span className="font-semibold">Phone:</span> {phone}
            </p>
            <p>
                <span className="font-semibold">Address:</span> {`${unitNumber ? unitNumber + ", " : ""}${streetAddress}, ${city}, ${province}, ${postalCode}`}
            </p>
            <div className="mt-16">
                <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={openModal}>Update</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2" onClick={openAccountDeletionModal}>Delete Account</button>
            </div>
            {isModalOpen && (
                <UpdateDetailsModal
                    isOpen={isModalOpen}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                    getErrorMessage={getErrorMessage}
                    message={message}
                />
            )}
            {isSuccessModalOpen && (
                <SuccessModal
                    isOpen={isSuccessModalOpen}
                    message={message}
                    onClose={closeSuccessModal}
                />
            )}
            {isAccountDeletionModalOpen && (
                <AccountDeletionModal 
                    onClose={closeAccountDeletionModal} 
                    handleDelete={handleDeleteUser} 
                    onCompletion={handleAccountDeletionCompletion} 
                />
            )}
        </div>
    );
};

export default PersonalDetails;
