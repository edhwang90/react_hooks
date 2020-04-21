import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../context/UserContext';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faTimes } from '@fortawesome/free-solid-svg-icons'

const MenuContainer = styled.div`
  cursor: pointer;
  position: relative;

  button {
    border-radius: 50%;
    border-color: transparent;
    background-color: #f7f7f7;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;

    &:hover {
      background-color: #007bff;
      color: #fff;
    }
  }

  ul {
    position: absolute;
    top: 75px;
    right: 0;
    list-style: none;
    min-width: 150px;
    background-color: #007bff;
    color: #fff;
  }

  a {
    padding: 5px 10px;
    z-index: 2;
    display: block;
  }
`;
export const Menu = () => {

  const [menuVisible, setMenuVisible] = useState(false);

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const hideMenu = e => {
      if (menuRef.current.contains(e.target)) {
        return;
      }
      setMenuVisible(false);
    };

    document.addEventListener('click', hideMenu);
    return () => document.removeEventListener('click', hideMenu);
  }, [menuRef]);

  const { onLogout } = useContext(UserContext);

  return (
    <MenuContainer className="UserMenu">
      <button
        className={ menuVisible ? 'active' : '' }
        onClick={toggleMenu}
        ref={menuRef}>
          {
            menuVisible
              ? (<FontAwesomeIcon icon={faTimes} />)
              : (<FontAwesomeIcon icon={faUserAstronaut} />)
          }
          
      </button>
      {
        menuVisible && (
          <ul>
            <li><a onClick={onLogout}>Logout</a></li>
          </ul>
        )
      }
    </MenuContainer>
  );
}