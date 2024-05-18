export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <CrudShowcase />
    </main>
  );
}

async function CrudShowcase() {
  return <div className="w-full max-w-xs"> </div>;
}
