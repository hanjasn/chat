import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const Chat = ({ user }) => {
  if (!user) {
    return <Redirect to='/signin' />
  }
  return (
    null
  );
};

export default Chat;