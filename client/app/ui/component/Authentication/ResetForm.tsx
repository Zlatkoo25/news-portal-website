"use client";

// TODO: Refactored API calls, and removed MockAPI routes. It broke.

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Link from "next/link";
import { LoginResponse } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isValidPassword } from "@/app/lib/utils/utils";

export default function PasswordResetForm() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const isFormValid = email.trim() !== "" && 
  isValidPassword(currentPassword) && 
  isValidPassword(newPassword) && 
  isValidPassword(retypePassword) && 
  newPassword === retypePassword 

  const handleReset = async () => {
    try {
      const response = await fetch("/api/mockReset", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, currentPassword, newPassword, retypePassword }),
      });

      const data: LoginResponse = await response.json();

      if (data.success) {
        setMessage(data.message ?? "Password reset successful");
        setTimeout(() => router.push("/login"), 2000)
      }
      else {
        setMessage(data.message ?? "Failed to reset password");
      }
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong.");
    }
  }

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mb-10 mt-5 p-4">
      <div className="flex flex-col gap-3">
        <label htmlFor="email">Email</label>
        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} 
        required className="w-full"/>

        <label htmlFor="currentPassword">Old Password</label>
        <Password inputId="currentPassword" toggleMask feedback={false} value={currentPassword} 
        onChange={(e) => setCurrentPassword(e.target.value)} required />

        <label htmlFor="newPassword">New Password</label>
        <Password inputId="newPassword" toggleMask value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} required minLength={8}/>

        <label htmlFor="retypePassword">Retype New Password</label>
        <Password inputId="retypePassword" toggleMask feedback={false} value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)} required minLength={8}/>
      </div>      

      <div className="flex flex-row gap-2 mt-4 justify-center content-between ">
        <Button label="Confirm" className="p-button-primary w-full" 
        onClick={handleReset} disabled={!isFormValid}/>

        <Link href="/login" passHref className="w-full">
            <Button label="Cancel" className="p-button-primary w-full" />
        </Link>
      </div>

      <div className="flex max-w-xs wrap-break-words w-full justify-between">
        {message? <p className="wrap-break-words w-full">{message}</p>: null}
      </div>

    </div>
  );
}