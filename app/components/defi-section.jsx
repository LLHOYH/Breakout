"use client";

import { useState } from "react";
import DefiInfo from "./defi-info";
import DefiList from "./defi-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const DefiSection = () => {
  const [selectedDapp, setSelectedDapp] = useState({
    name: "Jupiter",
    dappName: "Jupiter",
    dappId: 46618,
    img: "/jup.png",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <section
        id="main-content"
        className="w-full h-min min-h-[508px] grid grid-cols-[2fr,7fr] p-5 rounded-2xl  bg-gradient-animated  gap-x-7"
      >
        <DefiList setSelectedDapp={setSelectedDapp} />
        <DefiInfo selectedDapp={selectedDapp} />
      </section>
    </QueryClientProvider>
  );
};

export default DefiSection;
