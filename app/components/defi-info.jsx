import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import DefiLoading from "./defi-loading";
import DefiTVL from "./defi-tvl";
import { useQuery } from "@tanstack/react-query";

const DefiInfo = ({ selectedDapp }) => {
  const [visibleTokens, setVisibleTokens] = useState(10);

  const { isPending, error, data } = useQuery({
    queryKey: ["dappName", selectedDapp.dappName],
    queryFn: () =>
      fetch(
        `/api/fetchDappInfo?dappId=${selectedDapp.dappId}&dappName=${selectedDapp.dappName}`
      )
        .then((res) => res.json())
        .then((result) => {
          setVisibleTokens(10);
          return {
            totalTvl: result.tvl
              .slice(-1)[0]
              .totalLiquidityUSD.toLocaleString(),
            tvls: result.tvl,
            symbol: result.symbol,
            mcap: result.mcap,
            holdingTokens: result.tokens,
          };
        }),
  });

  return (
    <Suspense fallback={DefiLoading}>
      <section className="grid grid-cols-[3fr,7fr] gap-x-8 pt-10">
        {isPending && (
          <div className="flex items-center justify-center col-span-2 space-x-2">
            <div className="w-16 h-16 border-4 border-t-4 border-dotted rounded-full border-t-transparent border-zinc-900 animate-spin"></div>
          </div>
        )}
        {!isPending && (
          <>
            <div
              id="defi-info"
              className="flex flex-col items-start justify-start gap-y-3"
            >
              <div className="flex items-center justify-start text-3xl font-bold gap-x-3">
                <Image
                  src={selectedDapp.img}
                  alt={selectedDapp.name}
                  width={30}
                  height={30}
                />
                <p>{selectedDapp.name}</p>
                <p className="text-base font-normal">{data?.symbol}</p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p>Total Value Locked</p>
                <p className="text-3xl font-bold">
                  ${data?.totalTvl.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-start gap-3">
                <p>Market Cap:</p>
                <p className="font-bold">${data?.mcap.toLocaleString()}</p>
              </div>
              <p className="font-bold">Current Holdings:</p>

              <div className="grid grid-cols-2 grid-rows-auto">
                {data?.holdingTokens.map((token, index) => {
                  if (index < visibleTokens) {
                    return (
                      <>
                        <p key={token[0]} className="truncate">
                          {token[0]}
                        </p>
                        <p key={token[1]} className="truncate">
                          {token[1].toLocaleString()}
                        </p>
                      </>
                    );
                  }
                })}
              </div>
              <div className="flex items-center self-end justify-end gap-5">
                {visibleTokens > 10 && (
                  <button
                    onClick={() => setVisibleTokens(10)}
                    className="hover:underline active:text-black active:font-bold"
                  >
                    (collapse)
                  </button>
                )}
                {data?.holdingTokens.length > visibleTokens && (
                  <button
                    onClick={() =>
                      setVisibleTokens((tokenNum) => tokenNum + 10)
                    }
                    className="hover:underline active:text-black active:font-bold"
                  >
                    (load more)
                  </button>
                )}
              </div>
            </div>
            <DefiTVL dapp_tvl={data?.tvls} dappName={selectedDapp.name} />
          </>
        )}
      </section>
    </Suspense>
  );
};

export default DefiInfo;
