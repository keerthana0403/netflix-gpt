export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (!isEmailValid) return "Email ID is not valid";

  if (!isPasswordValid.test(password)) {
    let errorMessage = "Invalid Password";

    if (password.length < 8) {
      errorMessage += "\n- Minimum length of 8 characters";
    }
    if (!/(?=.*\d)/.test(password)) {
      errorMessage += "\n- At least one digit";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errorMessage += "\n- At least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errorMessage += "\n- At least one uppercase letter";
    }
    return errorMessage;
  }

  return null;
};
