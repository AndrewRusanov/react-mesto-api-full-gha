// import { useNavigate } from "react-router-dom";
import Form from "./Form";
// import * as auth from "../utils/Auth.js";
import { useState } from "react";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    login(email, password);
  };

  return (
    <div className="sign">
      <h1 className="sign__title">Вход</h1>
      <Form
        buttonText="Войти"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={(event) => handleSubmit(event)}
      />
    </div>
  );
};

export default Login;
