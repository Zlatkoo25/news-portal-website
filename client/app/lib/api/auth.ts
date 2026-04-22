export async function login(email: string, password: string) {
  const res = await fetch('http://localhost:3002/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  console.log("Logging in was a success!");

  return data;
}

// TODO: Change localStorage with Redux Toolkit
export async function fetchWithAuth(url: string) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
