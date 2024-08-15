// Import necessary testing utilities
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import SignUp from '../pages/SignUp';
import { fireEvent } from '@testing-library/react';


// Mock BrowserRouter in your test
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Your test using the mocked BrowserRouter
test('shows 1 heading, 1 button, 1 checkbox, 8 textbox, 11options', async () => {
  renderWithRouter(<SignUp />);

  const titles = await screen.findAllByRole('heading');
  expect(titles).toHaveLength(1);

  const button = await screen.findAllByRole('button');
  expect(button).toHaveLength(1);

  const checkbox = await screen.findAllByRole('checkbox');
  expect(checkbox).toHaveLength(1);

  const textbox = await screen.findAllByRole('textbox');
  expect(textbox).toHaveLength(8);

  const option = await screen.getAllByRole('option');
  expect(option).toHaveLength(11);
});

test('should navigate to Login Page when link is clicked', () => {
    renderWithRouter(<SignUp />);
  
    const link = screen.getByText('Please Login');
  
    fireEvent.click(link);
 
    expect(link.getAttribute('href')).toBe('/login');
        
  });
  