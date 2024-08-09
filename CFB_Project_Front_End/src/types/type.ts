//Account props
export type Account = {
    _id: string;
    accountNumber: string;
    balance: number;
    accountType: 'Checking' | 'Saving' | 'Credit';
    openDate: string;
}

//TransactionHistory props
export type Transaction = {
    id: number;
    date: string;
    description: string;
    amount: number;
    accountType: string;
};

//Activity props
export type Activity = {
    id: number;
    date: string;
    description: string;
    accountType: string;
    category: string;
}

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    unitNumber?: string;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
    password: string;
    accounts: Account[];
    transactions: Transaction[];
    activities: Activity[];
    updateUser: (email: string) => void;
}

export type PersonalDetailsProps = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    unitNumber: string;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
    updateUser: (email: string) => void;
};

//UpdateDetailsModal props
export type UpdateDetailsModalProps = {
    isOpen: boolean;
    formData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        unitNumber: string;
        streetAddress: string;
        city: string;
        province: string;
        postalCode: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    closeModal: () => void;
    getErrorMessage: (field: string) => JSX.Element | null;
    message: string;
};