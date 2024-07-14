import { Connection, clusterApiUrl } from "@solana/web3.js";

const SolanaEpoch = async () => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));

  const slotsArray = Array.from({ length: 100 }, (_, index) => index);
  async function getEpochInfo() {
    try {
      const epoch = await connection.getEpochInfo();
      return epoch;
    } catch (error) {
      console.error("Error fetching epoch info:", error);
      return {
        absoluteSlot: 277442753,
        blockHeight: 256735093,
        epoch: 642,
        slotIndex: 98753,
        slotsInEpoch: 432000,
        transactionCount: 303518030418,
      };
    }
  }

  let {
    absoluteSlot,
    blockHeight,
    epoch,
    slotIndex,
    slotsInEpoch,
    transactionCount,
  } = await getEpochInfo();

  let slotPercentage = (slotIndex / slotsInEpoch * 100).toFixed(1);


  return (
    <div className="flex flex-col w-full gap-4 p-3 bg-black border-2 border-black rounded-2xl">
      <div className="grid grid-cols-3 grid-rows-2">
        <p>Block Height:</p>
        <p>Transaction Count:</p>
        <p>Current Epoch:</p>
        <p> {blockHeight.toLocaleString()}</p>
        <p> {transactionCount.toLocaleString()}</p>
        <p>{epoch}</p>
      </div>
      <div className="flex flex-col items-end justify-end flex-grow">
        <p className="text-sm">Slots: {slotIndex.toLocaleString()} / {slotsInEpoch.toLocaleString()} ({slotPercentage}%)</p>
        <div
          id="slot_bars"
          className="flex flex-wrap flex-grow gap-[1px] self-stretch">
          {slotsArray.map((slot) => (
            <div
              key={slot}
              className={`flex-grow ${
                slot < Number(slotPercentage) ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
        {/* <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="w-1/2 h-2 bg-blue-600 rounded-full"></div>
          </div> */}
      </div>
    </div>
  );
};

export default SolanaEpoch;
