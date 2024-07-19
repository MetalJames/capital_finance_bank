// Import necessary testing utilities
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import HelpCenter from './HelpCenter';

// Mock BrowserRouter in your test
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Your test using the mocked BrowserRouter
test('shows 3 heading', async () => {
  renderWithRouter(<HelpCenter />);

  const titles = await screen.findAllByRole('heading');
  expect(titles).toHaveLength(4);
});

