'use client'

// import Table from "@/app/ui/component/Dashboard/Table";
import { useState, useEffect } from "react";
import NewsCard from "../ui/component/Homepage/NewsCard";

export default function Home() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/api/v1/article")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-black font-bold text-4xl">News</p>
      {/* <Table articles={articles} /> */}
      <NewsCard articles={articles} />
    </div>
  );
}