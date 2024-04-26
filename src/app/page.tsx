export default async function Home() {
  return (
    <main className="flex  flex-col items-center justify-center ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Safe <span className="text-[hsl(280,100%,70%)]">Bus</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-3xl font-bold">
            To add a review about your driver, scan the qr code located in the
            cabin
          </p>
        </div>
        <div
          id="blob"
          className="absolute bottom-20 -z-10 h-[45vh] w-[60vh] rounded-full  bg-gradient-to-br from-[#ff98ff] to-[#8463bf] blur-3xl duration-[3000ms]"
        ></div>
      </div>
    </main>
  );
}
