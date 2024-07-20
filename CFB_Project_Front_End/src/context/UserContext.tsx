// UserContext.tsx
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { User } from '../types/type';
import axios from 'axios';

export type UserContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    refreshUserData: (email: string) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    refreshUserData: () => {},
});

type UserProviderProps = {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null); // Initialize with null or initial user state

    //const refreshUserData = async () => {
    const refreshUserData = async (email: string) => {
        try {
            //const response = await axios.get('http://localhost:5000/api/user'); // Adjust the endpoint as needed
            const response = await axios.get(`http://localhost:5000/api/user`, {
                params: { email } // Pass the email as a query parameter
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error refreshing user data:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, refreshUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
