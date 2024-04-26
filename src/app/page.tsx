export default async function Home() {
  return (
    <main className="flex  flex-col items-center justify-center ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Safe <span className="text-[hsl(280,100%,70%)]">Bus</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl">
            To add a review about your driver, scan the qr code located in the
            cabin
          </p>
        </div>
      </div>
    </main>
  );
}
