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
    background-color: ${ props => props.theme.bg };
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;

    &:hover {
      background-color: ${ props => props.theme.primary };
      color: ${ props => props.theme.primaryfc };
    }
  }

  ul {
    position: absolute;
    top: 75px;
    right: 0;
    list-style: none;
    min-width: 150px;
    background-color: ${ props => props.theme.primary };
    color: ${ props => props.theme.primaryfc };
  }

  a {
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
    <MenuContainer>
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
            <li><a className="content" onClick={onLogout}>Logout</a></li>
          </ul>
        )
      }
    </MenuContainer>
  );
}