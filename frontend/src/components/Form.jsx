const Form = ({
  buttonText,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}) => {
  return (
    <form
      className="form"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <input
        type="email"
        className="form__input"
        placeholder="Email"
        value={email || ''}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        className="form__input"
        placeholder="Пароль"
        value={password || ''}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="submit" className="form__button">
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
