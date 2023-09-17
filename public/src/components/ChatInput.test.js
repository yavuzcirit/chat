import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ChatInput from './ChatInput';

test('renders chat input with send button and emoji button', () => {
  const handleSendMsg = jest.fn();
  
  render(<ChatInput handleSendMsg={handleSendMsg} />);
  
  const sendButton = screen.getByTestId('send-button');
  const emojiButton = screen.getByTestId('emoji-button');
  
  expect(sendButton).toBeInTheDocument();
  expect(emojiButton).toBeInTheDocument();
});

test('sends a message', () => {
  const handleSendMsg = jest.fn();
  
  render(<ChatInput handleSendMsg={handleSendMsg} />);
  
  const inputElement = screen.getByTestId('chat-input');
  fireEvent.change(inputElement, { target: { value: 'Hello!' } });
  
  const sendButton = screen.getByTestId('send-button');
  fireEvent.click(sendButton);
  
  expect(handleSendMsg).toHaveBeenCalledWith('Hello!');
});

test('adds emoji to message', () => {
  const handleSendMsg = jest.fn();
  
  render(<ChatInput handleSendMsg={handleSendMsg} />);
  
  const emojiButton = screen.getByTestId('emoji-button');
  fireEvent.click(emojiButton);
  
  const emoji = screen.getByText('😊');
  fireEvent.click(emoji);
  
  const inputElement = screen.getByTestId('chat-input');
  expect(inputElement.value).toBe('😊');
});
