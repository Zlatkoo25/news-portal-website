import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Article } from '@/app/lib/definitions';

export default function Table({ articles }: { articles: Article[] }) {
  return (
    <div className="card">
      <DataTable value={articles} paginator rows={5}>
        <Column field="title" header="Title" />
        <Column field="excerpt" header="Excerpt" />
        <Column
          header="Author"
          body={(rowData: Article) =>
            `${rowData.author.first_name} ${rowData.author.last_name}`
          }
        />
        <Column
          header="Categories"
          body={(rowData: Article) =>
            rowData.categories.map((c) => c.name).join(", ")
          }
        />
      </DataTable>
    </div>
  );
}
