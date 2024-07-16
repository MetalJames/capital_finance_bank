// User.ts
export type Account = {
    _id: string;
    accountNumber: string;
    balance: number;
    accountType: 'Checking' | 'Saving' | 'Credit';
    openDate: string;
}

export type Transaction = {
    id: number;
    date: string;
    description: string;
    amount: number;
}

export type Activity = {
    id: number;
    date: string;
    description: string;
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
}
