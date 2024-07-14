const SolanaPrice = async () => {
  async function getSolanaPrice() {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
        { next: { revalidate: 60 * 10 } }
      );
      const result = await response.json();
      return result.solana.usd;
    } catch (err) {
      console.log("error in fetching solana price", err);
      return 140;
    }
  }

  let price = await getSolanaPrice();

  return (
    <div className="relative w-full p-3 bg-black border-2 border-black rounded-2xl">
      Solana Price
      <p className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-6xl font-bold">
        ${price}
      </p>
    </div>
  );
};

export default SolanaPrice;
