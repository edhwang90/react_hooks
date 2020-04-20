import React, { useContext } from 'react';
import { Menu } from './Menu';
import { EmailContext } from '../../context/EmailContext';

export const Header = () => {
  const { emails } = useContext(EmailContext);
  
  return (
    <header className="Header">
      <div>
        <h2>MyMail</h2>
        <div className="emails">
          {emails.length} emails
        </div>
      </div>
      <Menu />
    </header>
  )
}