import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ChatContainer from './ChatContainer';

test('renders chat container with messages', () => {
  const currentChat = {
    _id: 'someId',
    avatarImage: 'base64image',
    username: 'John Doe',
  };

  const socket = {
    current: {
      on: jest.fn(),
      emit: jest.fn(),
    }
  };

  render(<ChatContainer currentChat={currentChat} socket={socket} />);
  
  // Check if the username is rendered
  const usernameElement = screen.getByText('John Doe');
  expect(usernameElement).toBeInTheDocument();
});

test('sends a message', () => {
  const currentChat = {
    _id: 'someId',
    avatarImage: 'base64image',
    username: 'John Doe',
  };

  const socket = {
    current: {
      on: jest.fn(),
      emit: jest.fn(),
    }
  };

  render(<ChatContainer currentChat={currentChat} socket={socket} />);

  // Simulate sending a message
  const inputElement = screen.getByTestId('chat-input');
  fireEvent.change(inputElement, { target: { value: 'Hello!' } });

  const sendButton = screen.getByTestId('send-button');
  fireEvent.click(sendButton);

  // Check if the message is sent
  expect(socket.current.emit).toHaveBeenCalledWith('send-msg', {
    to: 'someId',
    from: '_id', // You may need to replace this with an actual value
    msg: 'Hello!',
  });
});
