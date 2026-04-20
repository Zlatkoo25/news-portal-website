// services/auth.ts
export async function login(email: string, password: string) {
  const res = await fetch('http://localhost:3002/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }
  console.log("Logging in was a success!");
  return res.json();
}
