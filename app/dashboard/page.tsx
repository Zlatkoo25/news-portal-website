import Table from "@/app/ui/component/Dashboard/Table";
import { products } from '@/app/lib/mockData';

export default function Home() {
  return (
    <div className="flex flex-col justify-center w-full  border-2 p-16">
      <p className="text-black">Homepage</p>
      <Table products={products}/>
    </div>
  );
}