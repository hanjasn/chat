import React from 'react';
import { emojify } from 'react-emoji';
import './Message.css';

const Message = ({ message: { username, text }, currentUsername }) => {
  return username === 'admin' ? (
    <div className="message-container d-flex justify-content-center">
      <div className="message-box margin-no-name bg-dark text-light">{emojify(text)}</div>
    </div>
  ) : username === currentUsername ? (
    <div className="message-container d-flex justify-content-end">
      <div className="message-box margin-no-name bg-primary text-light">
        {emojify(text)}
      </div>
    </div>
  ) : (
    <div className="message-container d-flex justify-content-start">
      <div className="message-name">{username}</div>
      <div className="message-box bg-light text-dark">{emojify(text)}</div>
    </div>
  );
};

export default Message;
