// Validation utilities

export const isValidPassword = (pwd: string) =>
  pwd.trim() !== "" && pwd.length >= 8;
