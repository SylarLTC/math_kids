export const validationPassword = (input) => {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
  const regex = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
    "g"
  );

  if (regex.test(input)) {
    return true;
  } else {
    return false;
  }
};
