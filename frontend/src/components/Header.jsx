import { NavLink, Route, Routes } from "react-router-dom";
import logo from "../images/header__logo.svg";

const Header = ({ email, signOut, loggedIn }) => {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Mesto" />
      <div className="header__info">
        {loggedIn && <p className="heaeder__email">{email}</p>}
        <Routes>
          <Route path="/main" element={<NavLink to="/sign-in" onClick={signOut} className="header__link header__link-out">Выйти</NavLink>}/>
          <Route path="/sign-up" element={<NavLink to="/sign-in" className="header__link" >Войти</NavLink>} />
          <Route path="/sign-in" element={<NavLink to="/sign-up" className="header__link" >Регистрациия</NavLink>}/>
        </Routes>
      </div>
    </header>
  );
};

export default Header;
