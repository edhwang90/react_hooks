import React, { useContext } from 'react';
import { Menu } from './Menu';
import { EmailContext } from '../../context/EmailContext';
import styled from 'styled-components';

const Top = styled.header`
  position: sticky;
  top: 0;
  padding: 15px 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Header = () => {
  const { emails } = useContext(EmailContext);

  return (
    <Top>
      <div>
        <h2>MyMail</h2>
        <span>{emails.length} emails</span>
      </div>
      <Menu />
    </Top>
  )
}