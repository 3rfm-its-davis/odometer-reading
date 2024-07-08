export function validateEmail(email: string) {
  const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return email.length === 0 || !validRegex.test(email)
    ? "Invalid email"
    : undefined;
}

export function validatePassword(password: string) {
  return password.length === 0 ? "Password is required" : undefined;
}
