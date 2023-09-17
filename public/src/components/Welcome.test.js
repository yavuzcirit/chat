import React from 'react';
import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';

test('renders welcome message with username', async () => {

  const mockLocalStorage = {
    [process.env.REACT_APP_LOCALHOST_KEY]: JSON.stringify({ username: 'JohnDoe' }),
  };

  global.localStorage = {
    getItem: key => mockLocalStorage[key],
  };

  render(<Welcome />);

 
  const welcomeMessage = screen.getByText(/Welcome, JohnDoe!/i);
  expect(welcomeMessage).toBeInTheDocument();


  const instructionMessage = screen.getByText(/Please select a chat to Start messaging./i);
  expect(instructionMessage).toBeInTheDocument();
});
