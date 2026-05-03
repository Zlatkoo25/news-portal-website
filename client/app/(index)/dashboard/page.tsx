'use client'

import DashboardTable from "@/app/ui/component/Dashboard/DashboardTable";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useState, useEffect } from "react";

export default function DashboardPage() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/api/v1/article")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return(
    <div>
      <ConfirmDialog />
      <DashboardTable articles={articles} />
    </div>
  )
}