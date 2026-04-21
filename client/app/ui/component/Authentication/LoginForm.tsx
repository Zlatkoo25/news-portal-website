"use client";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/app/lib/api/auth";
import { isValidPassword } from "@/app/lib/utils";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const isFormValid = email.trim() !== "" && isValidPassword(password);

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      if (data.access_token) {
        // TODO: store JWT in LOCALSTORAGE. Change to Redux Toolkit soon.
        localStorage.setItem("token", data.access_token); 
        setMessage(`Logged in with email: ${email}!`);
        setTimeout(() => router.push("/"), 2000);
      } else {
        setMessage("Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mb-10 mt-5 p-2 pb-0.5">
      <label htmlFor="email">Email</label>
      <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="password">Password</label>
      <Password
        id="password"
        type="password"
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

      <Link href="/reset" passHref>
        <Button label="Reset" className="p-button-secondary w-full" />
      </Link>

      {message ? <p>{message}</p> : null}
    </div>
  );
}