import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Logout from './Logout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logoutRoute } from '../utils/APIRoutes'; 

jest.mock('axios');



jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('logs out user on button click', async () => {
 
  const mockLocalStorage = {
    [process.env.REACT_APP_LOCALHOST_KEY]: JSON.stringify({_id: 'someUserId'}),
  };

  global.localStorage = {
    getItem: key => mockLocalStorage[key],
    clear: jest.fn(),
  };

  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

 
  axios.get.mockResolvedValue({ status: 200 });

  render(<Logout />);

  const logoutButton = screen.getByRole('button');
  fireEvent.click(logoutButton);

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith(`${logoutRoute}/someUserId`);
  });

  await waitFor(() => {
    expect(localStorage.clear).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
