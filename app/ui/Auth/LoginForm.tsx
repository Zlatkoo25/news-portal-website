"use client";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginResponse } from "@/app/lib/definitions";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch ("/api/mockLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: LoginResponse = await response.json();

      if (data.success) {
          setMessage(`Logged in with email: ${data.user?.email}! \n 
          Token: ${data.user?.token}`);
          setTimeout(() => {router.push('/')}, 2000)
      }
      else {
        setMessage(data.message ?? "Login failed")
      }
    } catch (err) {
        setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mb-10 mt-5 p-2 pb-0.5">
      
      <label htmlFor="email">Email</label>
      <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      
      <label htmlFor="password">Password</label>
      <Password id="password" type="password" value={password} onChange={(e) => 
        setPassword(e.target.value)} feedback={false} />

      <Button label="Login" className="p-button-primary w-full" onClick={handleLogin}/>

      {/* TODO: Implement Reset page with proper routing as Login page above. */}
      <Link href="/reset" passHref>
          <Button label="Reset" className="p-button-secondary w-full" />
      </Link>

      {message? <p>{message}</p> : null}

    </div>
  );
}