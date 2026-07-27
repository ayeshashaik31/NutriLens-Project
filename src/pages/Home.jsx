import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadCard from "../components/UploadCard";

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute left-1/2 top-24 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-lime-400/15 blur-[150px]" />

      <Navbar />
      <Hero />
      <UploadCard />
    </main>
  );
}

export default Home;
