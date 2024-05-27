import bcrypt from 'bcryptjs';


export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export const verifyPassword = (password, hashedPassword) => {
  const isValid = bcrypt.compareSync(password, hashedPassword);
  return isValid;
};