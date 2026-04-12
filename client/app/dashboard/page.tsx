import Table from "@/app/ui/component/Dashboard/Table";
import { products } from '@/app/lib/mockData';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-black font-bold text-3xl">Table</p>
      <Table products={products} />
    </div>
  );
}