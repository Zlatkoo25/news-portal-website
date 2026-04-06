"use client";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Link from "next/link";

export default function PasswordResetForm() {
  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mb-10 mt-5 p-4">

      <label htmlFor="email">Email</label>
      <InputText id="email" />
      
      <label htmlFor="oldPassword">Old Password</label>
      <Password id="oldPassword" toggleMask feedback={false} />

      <label htmlFor="newPassword">New Password</label>
      <Password id="newPassword" toggleMask />

      <label htmlFor="confirmPassword">Retype New Password</label>
      <Password id="confirmPassword" toggleMask feedback={false} />

      <div className="flex gap-2 mt-4 justify-around">
        <Link href="/login" passHref>
            <Button label="Confirm" className="p-button-secondary" />
        </Link>
        <Link href="/login" passHref>
            <Button label="Cancel" className="p-button-secondary" />
        </Link>
      </div>
    </div>
  );
}