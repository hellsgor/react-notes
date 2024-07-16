export function registerUser(
  email: string,
  username: string,
  password: string,
): Promise<void> {
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  }).then(() => undefined);
}
