import React, { useContext } from 'react';
import { EmailContext } from '../../context/EmailContext';

export const Message = () => {
  const { currentEmail, onSelectEmail } = useContext(EmailContext);
  
  return (
    <div className="MessageViewer">
      <button onClick={() => onSelectEmail(null)}>
        Back
      </button>
      <h2>{currentEmail.subject}</h2>
      <div>{currentEmail.body}</div>
    </div>
  )
}