import Image from "next/image";
import { Inter } from "next/font/google";
import SolChart from "./components/sol-chart";
import SolanaTVL from "./components/solana-tvl";
import SolanaEpoch from "./components/solana-epoch";
import SolanaPrice from "./components/solana-price";
import DefiSection from "./components/defi-section";
import SearchBar from "./components/search-bar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-start min-h-screen min-w-[1280px] bg-black p-12 text-white ${inter.className} gap-y-6`}
    >
      <section
        id="main-header"
        className="w-full h-min grid grid-rows-[3fr,1fr] grid-cols-1 lg:grid-rows-1 lg:grid-cols-[3fr,1fr]"
      >
        <div
          id="logo-nav"
          className="flex items-center justify-start gap-8 font-bold"
        >
          <div className="relative mb-2 text-4xl font-black">
            <p className="text-gradient ">Breakout</p>
            <p className="absolute left-1 top-1">Breakout</p>
          </div>
        </div>
        {/* <SearchBar /> */}
      </section>

      <section
        id="solana-section"
        className="grid w-full grid-cols-2 min-h-min gap-x-6"
      >
        <div className="grid grid-rows-2 p-5 gap-y-11 rounded-2xl bg-gradient-animated ">
          <SolanaPrice />
          <SolanaEpoch />
        </div>
        <div className="w-full p-5 rounded-2xl bg-gradient-animated ">
          <SolanaTVL />
        </div>
      </section>

      <DefiSection />
    </main>
  );
}
