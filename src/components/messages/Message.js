import React, { useContext } from 'react';
import { EmailContext } from '../../context/EmailContext';

import styled from 'styled-components';

const Email = styled.article`
  padding: 15px 20px;

  button {
    border: none;
    background-color: #fff;
    padding: 10px 15px;
    cursor: pointer;
    font-size: .75rem;

    &:hover {
      background-color: #007bff;
      color: #fff;
    }
  }

  section {
    margin-top: 15px;
  }

  h2 {
    margin-bottom: 15px;
  }
`;

export const Message = () => {
  const { currentEmail, onSelectEmail } = useContext(EmailContext);
  
  return (
    <Email className="MessageViewer">
      <button onClick={() => onSelectEmail(null)}>
        Back
      </button>

      <section>
        <h2>{currentEmail.subject}</h2>
        <p>{currentEmail.body}</p>
      </section>
    </Email>
  )
}