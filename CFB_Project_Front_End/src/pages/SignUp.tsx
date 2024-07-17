import React, { useState } from "react";
import { Link } from "react-router-dom";
import GeneralInput from "../components/GeneralInput";

const SignUp = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [unitNumber, setUnitNumber] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [message, setMessage] = useState('');

    const provinces = [
        { label: 'Select Province', value: '' },
        { label: 'Ontario', value: 'ON' },
        { label: 'Quebec', value: 'QC' },
        { label: 'British Columbia', value: 'BC' },
        { label: 'Alberta', value: 'AB' },
        { label: 'Manitoba', value: 'MB' },
        { label: 'Saskatchewan', value: 'SK' },
        { label: 'Nova Scotia', value: 'NS' },
        { label: 'New Brunswick', value: 'NB' },
        { label: 'Prince Edward Island', value: 'PE' },
        { label: 'Newfoundland and Labrador', value: 'NL' },
    ];

    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let valid = true;
        const newErrors: { [key: string]: string } = {};

        if (!firstName) {
            valid = false;
            newErrors['firstName'] = 'First name is required.';
        }
        if (!lastName) {
            valid = false;
            newErrors['lastName'] = 'Last name is required.';
        }
        if (!email) {
            valid = false;
            newErrors['email'] = 'Email is required.';
        } else if (!regEmail.test(email)) {
            valid = false;
            newErrors['email'] = 'Email is not valid.';
        }
        if (!phone) {
            valid = false;
            newErrors['phone'] = 'Phone number is required.';
        }
        if (!streetAddress) {
            valid = false;
            newErrors['streetAddress'] = 'Street address is required.';
        }
        if (!city) {
            valid = false;
            newErrors['city'] = 'City is required.';
        }
        if (!province) {
            valid = false;
            newErrors['province'] = 'Province is required.';
        }
        if (!postalCode) {
            valid = false;
            newErrors['postalCode'] = 'Postal code is required.';
        }
        if (!password) {
            valid = false;
            newErrors['password'] = 'Password is required.';
        }
        if (confirmPassword !== password) {
            valid = false;
            newErrors['confirmPassword'] = 'Passwords do not match.';
        }
        if (!agree) {
            valid = false;
            newErrors["agreement"] = "Did you check agreement?";
        }
        if (!valid) {
            setErrors(newErrors);
            return;
        }

        alert('Thank you for signing up! This is just a demo :)');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setUnitNumber('');
        setStreetAddress('');
        setCity('');
        setProvince('');
        setPostalCode('');
        setPassword('');
        setConfirmPassword('');
        setAgree(false);
        setErrors({});
        setMessage('');
    }

    const getErrorMessage = (field: string) => {
        return errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>;
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#EADBC8]">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">EasyWeb Register</h1>
                <p className="text-sm">
                    Already have an account? <Link to="/login" className="text-[#DEAC80] cursor-pointer">Please Login</Link>
                </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-[#F7E9D7] p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="firstName">First Name</label>
                        <GeneralInput id="firstName" text="text" placeholder="First Name" value={firstName} propFunction={(e) => setFirstName(e.target.value)} error={!!errors.firstName} />
                        {getErrorMessage('firstName')}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="lastName">Last Name</label>
                        <GeneralInput id="lastName" text="text" placeholder="Last Name" value={lastName} propFunction={(e) => setLastName(e.target.value)} error={!!errors.lastName} />
                        {getErrorMessage('lastName')}
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label className="text-sm font-semibold" htmlFor="email">Email Address</label>
                        <GeneralInput text="text" placeholder="Email Address" value={email} propFunction={(e) => setEmail(e.target.value)} error={!!errors.email} />
                        {getErrorMessage('email')}
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label className="text-sm font-semibold" htmlFor="phone">Phone Number</label>
                        <GeneralInput text="text" placeholder="Phone Number" value={phone} propFunction={(e) => setPhone(e.target.value)} error={!!errors.phone} />
                        {getErrorMessage('phone')}
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label className="text-sm font-semibold" htmlFor="streetAddress">Street Address</label>
                        <GeneralInput text="text" placeholder="Street Address" value={streetAddress} propFunction={(e) => setStreetAddress(e.target.value)} error={!!errors.streetAddress} />
                        {getErrorMessage('streetAddress')}
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label className="text-sm font-semibold" htmlFor="unitNumber">Unit Number (optional)</label>
                        <GeneralInput text="text" placeholder="Unit Number" value={unitNumber} propFunction={(e) => setUnitNumber(e.target.value)} error={!!errors.unitNumber} />
                        {getErrorMessage('unitNumber')}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="city">City</label>
                        <GeneralInput text="text" placeholder="City" value={city} propFunction={(e) => setCity(e.target.value)} error={!!errors.city} />
                        {getErrorMessage('city')}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="province">Province</label>
                        <select
                            id="province"
                            className={`my-2 w-full border-2 ${errors.province ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                        >
                            {provinces.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        {getErrorMessage('province')}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="postalCode">Postal Code</label>
                        <GeneralInput text="text" placeholder="Postal Code" value={postalCode} propFunction={(e) => setPostalCode(e.target.value)} error={!!errors.postalCode} />
                        {getErrorMessage('postalCode')}
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label className="text-sm font-semibold" htmlFor="password">Password</label>
                        <GeneralInput text="password" placeholder="Password" value={password} propFunction={(e) => setPassword(e.target.value)} error={!!errors.password} />
                        {getErrorMessage('password')}
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label className="text-sm font-semibold" htmlFor="confirmPassword">Confirm Password</label>
                        <GeneralInput text="password" placeholder="Confirm Password" value={confirmPassword} propFunction={(e) => setConfirmPassword(e.target.value)} error={!!errors.confirmPassword} />
                        {getErrorMessage('confirmPassword')}
                    </div>
                </div>
                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        id="agreement"
                        className="mr-2"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    <label htmlFor="agreement" className="text-sm">I agree to the <Link to="/terms" className="text-[#DEAC80] cursor-pointer">terms and conditions</Link></label>
                    {errors["agreement"] && (
                        <p className="text-red-500 text-xs">{errors["agreement"]}</p>
                    )}
                </div>
                <button type="submit" className="w-full bg-[#DEAC80] text-white py-2 rounded-lg mt-4 hover:bg-[#c79463]">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
