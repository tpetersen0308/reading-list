import React, { useState } from "react";
import { UserMenuProps } from "./UserMenuProps";
import "./UserMenu.css";
import { Button } from "react-bootstrap";
import { IEvent } from "../../types/IEvent";

const UserMenu: React.FC<UserMenuProps> = ({ user, setUser, apiHandler }) => {
  const [dropdownVisible, toggleDropdown] = useState<boolean>(false);

  const logout = (event: IEvent["buttonEvent"]) => {
    event.preventDefault();
    localStorage.removeItem("user");
    apiHandler.get("/auth/signout");
    setUser(null);
  }

  const listReadingLists = () => {
    if (user.readingLists.length > 0) {
      return user.readingLists.map(r => {
        return <a className="reading-list-link" key={r.title} href={`/reading-list/${r.readingListId}`}>{r.title}</a>
      });
    }
    return <p className="reading-list-link">You do not have any reading lists.</p>;
  }

  return (
    <span className="user-menu">
      <img className="avatar" alt="avatar" src={user ? user.avatar : ""} onClick={() => toggleDropdown(!dropdownVisible)} />
      {
        dropdownVisible &&
        <div className="dropdown">
          <Button id="logout-button" variant="primary" size="sm" onClick={logout}>Log Out</Button>
          <br />
          <div className="reading-list-menu">Your Reading Lists:
              {listReadingLists()}
          </div>
        </div>
      }
    </span>
  )
}

export default UserMenu;