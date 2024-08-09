
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import '@testing-library/jest-dom';

describe('Home Component', () => {
  it('renders without crashing', () => {
    const { getByText, getByAltText } = render(
      <Router>
        <Home />
      </Router>
    );

    expect(getByText('Capital Finance Bank')).toBeInTheDocument();
    expect(getByAltText('Welcome Logo')).toBeInTheDocument();
    expect(getByText('Your financial partner for a secure and prosperous future.')).toBeInTheDocument();
    expect(getByText('GET OFFERS AND DISCOUNTS USING CFB')).toBeInTheDocument();
    expect(getByText('Get 20% offer on every purchase for a month.')).toBeInTheDocument();
    expect(getByText('Open CFB Account immediately by Signing-in and complete the activation to start shopping now - It is that quick!!')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('$0 Monthly Fee')).toBeInTheDocument();
    expect(getByText('Unlimited Transaction')).toBeInTheDocument();
    expect(getByText('Personal')).toBeInTheDocument();
    expect(getByText('Support')).toBeInTheDocument();
    expect(getByText('Mortgage')).toBeInTheDocument();
  });

  it('contains the correct links', () => {
    const { getByText } = render(
      <Router>
        <Home />
      </Router>
    );

    expect(getByText('Sign Up').closest('a')).toHaveAttribute('href', '/signup');
    expect(getByText('Personal').closest('a')).toHaveAttribute('href', '/login');
    expect(getByText('Support').closest('a')).toHaveAttribute('href', '/contactus');
  });

});
