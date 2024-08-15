// Import necessary testing utilities
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Support from "../pages/Support";
import { fireEvent } from '@testing-library/react';


// Mock BrowserRouter in your test
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Your test using the mocked BrowserRouter
test('shows 1 heading, 1 button, 1 checkbox and 2 textbox', async () => {
  renderWithRouter(<Support />);

  const titles = await screen.findAllByRole('heading');
  expect(titles).toHaveLength(4);

});

test('should navigate to ... when link is clicked', () => {
    renderWithRouter(<Support />);
  
    const link = screen.getByText('New User? Please Sign Up');

  
    fireEvent.click(link);
 
    expect(link.getAttribute('href')).toBe('/signup');
        
  });
  