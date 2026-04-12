import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TableProps } from '@/app/lib/definitions';


export default function Table({ products }: TableProps) {

  return (
    <div className="card">
      <DataTable value={products} showGridlines stripedRows 
      paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
      tableStyle={{ minWidth: '50rem' }}>
        <Column field="code" header="Id"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
}
        