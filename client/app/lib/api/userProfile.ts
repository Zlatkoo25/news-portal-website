import { UpdateProfileDto } from "../definitions";

export async function fetchProfile(token: string) {
  const res = await fetch("http://localhost:3002/api/v1/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function updateProfile(token: string, data: UpdateProfileDto) {
  const res = await fetch("http://localhost:3002/api/v1/users/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Update failed");
  }

  return res.json();
}