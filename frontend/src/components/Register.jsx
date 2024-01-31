import { NavLink, useNavigate } from "react-router-dom";
import Form from "./Form";
import * as auth from "../utils/Auth";
import { useState } from "react";

const Register = ({ onInfoTooltip, setLoggedIn, closeFunction }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    auth
      .register(password, email)
      .then(() => {
        setLoggedIn(true);
        setTimeout(() => {
          closeFunction();
          navigate("/sign-in", { replace: true });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setLoggedIn(false);
        onInfoTooltip();
        setTimeout(() => closeFunction(), 1000);
      })
      .finally(() => onInfoTooltip());
  };

  return (
    <div className="sign">
      <h1 className="sign__title">Регистрация</h1>
      <Form
        buttonText="Зарегистрироваться"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
      <p className="sign__subtitle">
        Уже зарегистрированы?{" "}
        <NavLink className="sign__link-in" to="/sign-in">
          Войти
        </NavLink>
      </p>
    </div>
  );
};

export default Register;
