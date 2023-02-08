export const validateInputFields = (values) => {
  const errors = {};
  if (!values.phone_number) {
    errors.phone_number = "Please enter your Mobile Number.";
  } else if (values.phone_number) {
    const pattern = new RegExp(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
    );
    if (!pattern.test(values.phone_number)) {
      errors.phone_number = "Please Enter Number Only";
    } else if (values.phone_number.length < 9) {
      errors.phone_number = "Please enter valid  Mobile Number.";
    }
  }

  const passwordRegex = /(?=.*[0-9])/;
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be 8 characters long.";
  } else if (!passwordRegex.test(values.password)) {
    errors.password = "Invalid password. Must contain one number.";
  }
  return errors;
};
