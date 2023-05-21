import * as bcrypt from 'bcryptjs';
export const mediumPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-={}|:"<>?,./]).{8,16}$/;

export const hashPassword = (password: string): string =>
  bcrypt.hashSync(password, 10);

export const comparePassword = (
  password: string,
  hashedPassword: string,
): boolean => bcrypt.compareSync(password, hashedPassword);
