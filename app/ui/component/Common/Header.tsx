import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

export default function Header() {
  const leftContents = (
    <div className="flex items-center gap-3">
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </div>
  );

  const rightContents = (
    <div className="flex items-center gap-2">
      <Button icon="pi pi-bell" className="p-button-rounded p-button-text" />
      <Button icon="pi pi-user" label="Profile" className="p-button-text" />
      <Button icon="pi pi-sign-out" label="Logout" className="p-button-danger" />
    </div>
  );

  return (
    <Toolbar start={leftContents} end={rightContents} className="shadow-md py-0! h-16" />
  );
}



