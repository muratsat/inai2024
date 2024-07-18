export default async function Home() {
  return (
    <main className="flex  flex-col items-center justify-center ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Safe <span className="text-[hsl(280,100%,70%)]">Bus</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="max-w-4xl text-5xl font-extrabold text-gray-800">
            Gather passenger feedback on public transport experiences to improve
            safety and comfort for all.
          </p>
        </div>
      </div>
    </main>
  );
}
