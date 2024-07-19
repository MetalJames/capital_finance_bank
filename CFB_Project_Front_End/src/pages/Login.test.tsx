// Import necessary testing utilities
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Login from './Login';
import { fireEvent } from '@testing-library/react';


// Mock BrowserRouter in your test
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Your test using the mocked BrowserRouter
test('shows 1 heading', async () => {
  renderWithRouter(<Login />);

  const titles = await screen.findAllByRole('heading');
  expect(titles).toHaveLength(1);

  const button = await screen.findAllByRole('button');
  expect(button).toHaveLength(1);

  const checkbox = await screen.findAllByRole('checkbox');
  expect(checkbox).toHaveLength(1);

  const textbox = await screen.findAllByRole('textbox');
  expect(textbox).toHaveLength(2);
});

test('should navigate to ... when link is clicked', () => {
    renderWithRouter(<Login />);
  
    const link = screen.getByText('Sign Up');
  
    fireEvent.click(link);
 
    expect(link.getAttribute('href')).toBe('/signup');
        
  });
  
