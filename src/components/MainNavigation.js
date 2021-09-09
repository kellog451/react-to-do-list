import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <span className={classes.logo}>TO DO LIST</span>
      <ul>
        <li>
          <NavLink to='/home'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/list'>My List</NavLink>
        </li>
        <li>
          <NavLink to='/reminders'>My Reminders</NavLink>
        </li>
        <li>
          <NavLink to='/new-item'>Add Item</NavLink>
        </li>
      </ul>
      <button>Sign Up</button>
    </header>
  );
};

export default MainNavigation;
