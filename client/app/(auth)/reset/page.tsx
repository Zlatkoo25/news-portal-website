'use client';

import ResetForm from "@/app/ui/component/Authentication/ResetForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ResetPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.replace("/");
    }
  }, [router]);

  return (
    <div>
      <ResetForm/>
    </div>
  );
}