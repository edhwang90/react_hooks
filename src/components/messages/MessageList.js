import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { EmailContext } from '../../context/EmailContext';

import styled from 'styled-components';

const EmailList = styled.div`
  li {
    padding: 15px 20px;
    border-bottom: 2px solid #fff;
    cursor: pointer;    
  }

  li:hover {
    background-color: #007bff;
    color: #fff;
  }

  label {
    display: block;
    font-weight: bold;
    cursor: pointer;   
  }

  .no-messages {
    padding: 15px 20px;
    text-align: center;
  }
`;

export const MessageList = () => {
  const { user } = useContext(UserContext);
  const { loading, emails, onSelectEmail } = useContext(EmailContext);
  
  return (
    <EmailList>
      { 
        loading 
        ? (<div className="no-messages">Loading...</div>) 
        : emails.length === 0 ? 
          (
            <div className="no-messages">
              Your mailbox is empty, {user.firstName}! 🎉
            </div>
          )
        : (
          <ul>
            {emails.map(email => (
              <Email
                key={email.id}
                email={email}
                onClick={onSelectEmail}
              />
            ))}
          </ul>
          )
        }
    </EmailList>
  )
}

const Email = React.memo(({ email, onClick }) => (
  <li onClick={() => onClick(email)}>
    <label>{email.subject}</label>
    <p>{email.preview}</p>
  </li>
));