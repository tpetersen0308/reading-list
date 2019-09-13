import React, { useState } from "react";
import { UserMenuProps } from "./UserMenuProps";
import "./UserMenu.css";
import { Button } from "react-bootstrap";

const UserMenu: React.FC<UserMenuProps> = ({ user, setUser, apiHandler }) => {
  const [dropdownVisible, toggleDropdown] = useState<boolean>(false);

  const logout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    localStorage.removeItem("user");
    apiHandler.get("/auth/signout");
    setUser(null);
  }

  return (
    <span className="user-menu">
      <img className="avatar" alt="avatar" src={user ? user.avatar : ""} onClick={() => toggleDropdown(!dropdownVisible)} />
      {
        dropdownVisible &&
        <div className="dropdown">
          <Button id="logout-button" variant="primary" size="sm" onClick={logout}>Log Out</Button>
        </div>
      }
    </span>
  )
}

export default UserMenu;