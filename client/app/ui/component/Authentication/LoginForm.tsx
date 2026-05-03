"use client";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValidPassword } from "@/app/lib/utils";
import { authApi } from "@/app/lib/api/auth";
import { LoginRequest } from "@/app/lib/definitions";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const isFormValid = email.trim() !== "" && isValidPassword(password);

  const handleLogin = async () => {
    try {
      const data = await authApi.login({ email, password } as LoginRequest);

      // TODO: Replace localStorage with Redux auth slice
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage(`Logged in as ${data.user.username}!`);
      setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      setMessage((err as Error).message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mb-10 mt-5 p-2 pb-0.5">
      <div className="flex flex-col gap-3">
        <label htmlFor="email">Email</label>
        <InputText
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <Password
          id="password"
          toggleMask
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          feedback={false}
          required
        />

        <Button
          label="Login"
          className="p-button-primary w-full"
          onClick={handleLogin}
          disabled={!isFormValid}
        />
        {/* TODO: Reset broke */}
        {/* <Link href="/reset" passHref>
          <Button label="Reset" className="p-button-secondary w-full" />
        </Link> */}
      </div>

      {message && (
        <div className="overflow-hidden w-full min-w-0">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}