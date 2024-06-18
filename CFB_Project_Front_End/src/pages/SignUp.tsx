import React, { useState } from "react";
import { Link } from "react-router-dom";
//import general reusable input componnent
import GeneralInput from "../components/GeneralInput";

const SignUp = () => {

    //setting variables here
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

    //create array of provinces here to make it easy to read
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

    //email validation using regex - so correct email will be entered
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //submittion functions with all validations
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

        //resetting all the fields
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

    // Helper function to get error message for a field
    const getErrorMessage = (field: string) => {
        return errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>;
    }

    //html starts here
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-3xl text-bold mb-4">Create Your Account</h1>
                <p>
                    or <Link to="/login" className="text-sky-400 cursor-pointer">Log In</Link>
                </p>
            </div>
            {/* form submittion starts here */}
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="firstName">First Name</label>
                        <GeneralInput id="firstNmae" text="text" placeholder="First Name" value={firstName} propFunction={(e) => setFirstName(e.target.value)} error={!!errors.firstName} />
                        {getErrorMessage('firstName')}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="lastName">Last Name</label>
                        <GeneralInput id="lastName" text="text" placeholder="Last Name" value={lastName} propFunction={(e) => setLastName(e.target.value)} error={!!errors.lastName} />
                        {getErrorMessage('lastName')}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="email">Email Address</label>
                        <GeneralInput text="text" placeholder="Email Address" value={email} propFunction={(e) => setEmail(e.target.value)} error={!!errors.email} />
                        {getErrorMessage('email')}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="phone">Phone Number</label>
                        <GeneralInput text="text" placeholder="Phone Number" value={phone} propFunction={(e) => setPhone(e.target.value)} error={!!errors.phone} />
                        {getErrorMessage('phone')}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="unitNumber">Unit Number (optional)</label>
                        <GeneralInput text="text" placeholder="Unit Number" value={unitNumber} propFunction={(e) => setUnitNumber(e.target.value)} error={!!errors.unitNumber} />
                        {getErrorMessage('unitNumber')}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="streetAddress">Street Address</label>
                        <GeneralInput text="text" placeholder="Street Address" value={streetAddress} propFunction={(e) => setStreetAddress(e.target.value)} error={!!errors.streetAddress} />
                        {getErrorMessage('streetAddress')}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="postalCode">Postal Code</label>
                        <GeneralInput text="text" placeholder="Postal Code" value={postalCode} propFunction={(e) => setPostalCode(e.target.value)} error={!!errors.postalCode} />
                        {getErrorMessage('postalCode')}
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
                            className={`text-[#000] my-2 w-full border-4 ${errors.province ? 'border-[red]' : 'border-[#243c5a]'}`}
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
                        <label className="text-sm font-semibold" htmlFor="password">Password</label>
                        <GeneralInput text="password" placeholder="Password" value={password} propFunction={(e) => setPassword(e.target.value)} error={!!errors.password} />
                        {getErrorMessage('password')}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold" htmlFor="confirmPassword">Confirm Password</label>
                        <GeneralInput text="password" placeholder="Confirm Password" value={confirmPassword} propFunction={(e) => setConfirmPassword(e.target.value)} error={!!errors.confirmPassword} />
                        {getErrorMessage('confirmPassword')}
                    </div>
                </div>
                {message && (
                    <div className="my-1 text-[red] font-light text-[12px]">
                        {message}
                    </div>
                )}
                <div className="flex justify-between items-center my-2">
                    <div>
                        <input type="checkbox" checked={agree} className="mr-2" onChange={() => setAgree(!agree)} />
                        <label htmlFor="agreement" className="text-sm">Agree To Policies and Conditions</label>
                        {getErrorMessage('agreement')}
                    </div>
                </div>
                <button type="submit" className='mt-4 my-2 bg-blue-700 text-white w-full p-2 hover:bg-blue-900 transition-colors duration-200'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;
