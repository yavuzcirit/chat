import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Contacts from './Contacts';

test('renders contacts with user information', () => {
  const contacts = [
    {
      _id: '1',
      avatarImage: 'base64image1',
      username: 'John Doe',
    },
    {
      _id: '2',
      avatarImage: 'base64image2',
      username: 'Jane Doe',
    }
  ];

  const changeChat = jest.fn();

  render(<Contacts contacts={contacts} changeChat={changeChat} />);

  const johnDoeElement = screen.getByText('John Doe');
  const janeDoeElement = screen.getByText('Jane Doe');
  const logoElement = screen.getByAltText('logo');

  expect(johnDoeElement).toBeInTheDocument();
  expect(janeDoeElement).toBeInTheDocument();
  expect(logoElement).toBeInTheDocument();
});

test('changes current chat when a contact is clicked', () => {
  const contacts = [
    {
      _id: '1',
      avatarImage: 'base64image1',
      username: 'John Doe',
    },
    {
      _id: '2',
      avatarImage: 'base64image2',
      username: 'Jane Doe',
    }
  ];

  const changeChat = jest.fn();

  render(<Contacts contacts={contacts} changeChat={changeChat} />);

  const johnDoeElement = screen.getByText('John Doe');

  fireEvent.click(johnDoeElement);

  expect(changeChat).toHaveBeenCalledWith(0, contacts[0]);
});
