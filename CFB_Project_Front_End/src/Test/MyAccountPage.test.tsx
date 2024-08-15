
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyAccountPage from '../pages/MyAccountPage';
import '@testing-library/jest-dom';
import useUserContext from '../hooks/useUserContext';
import { User } from '../types/type';
//import { Activity } from '../types/type';

// Mock the useUserContext hook
jest.mock('../hooks/useUserContext');
const mockedUseUserContext = useUserContext as jest.MockedFunction<typeof useUserContext>;

const mockUser: User = {
 firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  unitNumber: '1',
  streetAddress: '123 Main St',
  city: 'Anytown',
  province: 'Anystate',
  postalCode: '12345',
password: '123',
id: '2',
accounts:[],
transactions:[],
activities:[],
updateUser: (email: string) => {
    console.log(`Updating email to: ${email}`);
}
};

const mockSetUser = jest.fn();
const mockRefreshUserData = jest.fn();

describe('MyAccountPage Component', () => {
  it('renders without crashing when user is not logged in', () => {
    mockedUseUserContext.mockReturnValue({
      user: null,
      setUser: mockSetUser,
      refreshUserData: mockRefreshUserData,
    });

    render(
      <Router>
        <MyAccountPage />
      </Router>
    );

    expect(screen.getByText('You are not logged in. Please log in to view your account.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Log In/i })).toHaveAttribute('href', '/login');
  });

  it('renders correctly when user is logged in', () => {
    mockedUseUserContext.mockReturnValue({
      user: mockUser,
      setUser: mockSetUser,
      refreshUserData: mockRefreshUserData,
    });

    render(
      <Router>
        <MyAccountPage />
      </Router>
    );

    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('1, 123 Main St, Anytown, Anystate, 12345')).toBeInTheDocument();
  });

  
});