// Import necessary testing utilities
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import SignUp from './SignUp';

// Mock BrowserRouter in your test
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Your test using the mocked BrowserRouter
test('shows 11 textboxes , 1 button and 1 checkbox, 1 link', async () => {
  renderWithRouter(<SignUp />);

  const input = await screen.findAllByRole('textbox');
  expect(input).toHaveLength(11);

  const button = await screen.findAllByRole('button');
  expect(button).toHaveLength(1);

  const checkbox = await screen.findAllByRole('checkbox');
  expect(checkbox).toHaveLength(1);

  const link = await screen.findAllByRole('link');
  expect(link).toHaveLength(1);

});
