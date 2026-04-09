export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <i className="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
      <span className="ml-3 text-lg">Loading dashboard...</span>
    </div>
  );
}