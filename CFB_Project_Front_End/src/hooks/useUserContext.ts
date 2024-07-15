// hooks/useUserContext.ts
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { UserContextType } from '../context/UserContext';

const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export default useUserContext;
