import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../context/UserContext';

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

  const { user, onLogout } = useContext(UserContext);

  return (
    <div className="UserMenu">
      <img
        className="UserAvatar"
        alt="User avatar"
        src={user.avatar}
        onClick={toggleMenu}
        ref={menuRef}
      />
      {
        menuVisible && (
          <ul>
            <li onClick={onLogout}>Logout</li>
          </ul>
        )
      }
    </div>
  );
}