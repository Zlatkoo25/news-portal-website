"use client";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mb-10 mt-5 p-2 pb-0.5">
      <label htmlFor="email">Email</label>
      <InputText id="email" />
      
      <label htmlFor="password">Password</label>
      <InputText id="password" type="password" />

      <Button label="Login" className="p-button-primary" />
      <Button label="Reset" className="p-button-secondary" />
    </div>
  );
}