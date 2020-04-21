import React, { useContext } from 'react';
import { EmailContext } from '../../context/EmailContext';

import styled from 'styled-components';

const Email = styled.article`
  button {
    border: none;
    background-color: #fff;
    cursor: pointer;
    font-size: .75rem;

    &:hover {
      background-color: ${ props => props.theme.primary };
      color: ${ props => props.theme.primaryfc };
    }
  }
`;

export const Message = () => {
  const { currentEmail, onSelectEmail } = useContext(EmailContext);
  
  return (
    <Email className="content">
      <button className="action-p" onClick={() => onSelectEmail(null)}>
        Back
      </button>

      <section className="content-mt">
        <h2>{currentEmail.subject}</h2>
        <p className="content-mt">{currentEmail.body}</p>
      </section>
    </Email>
  )
}