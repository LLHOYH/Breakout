import SolanaTVLChart from "./solana-tvl-chart";

const options = { day: 'numeric', month: 'long', year: 'numeric' };

const SolanaTVL = async () => {
  async function getSolanaTVL() {
    const response = await fetch("https://api.llama.fi/charts/solana", {
      next: { revalidate: 3600 },
    });
    return await response.json();
  }

  let result = await getSolanaTVL();
  let recent_tvls = result.slice(-14);
  let tvl_date_keys=[], tvl_volume_list=[];

  //filter out the tvl date, for category naming
  //filter out the price for high chart to connect the dots as a line
  recent_tvls.forEach((tvl,index)=>{
    let formattedDate = new Date(Number(tvl.date)*1000).toLocaleDateString('en-GB',options);
    formattedDate=formattedDate.slice(0, -4) + formattedDate.slice(-2);
    tvl_date_keys.push(formattedDate);
    tvl_volume_list.push({name:formattedDate, color:index%2==0 ? "#00D5DA" : "#E48181", y:tvl.totalLiquidityUSD})
  });

  return (
    <div className="w-full p-5 bg-black border-2 border-black rounded-2xl">
      <SolanaTVLChart tvl_volume_list={tvl_volume_list} tvl_date_keys={tvl_date_keys} />
    </div>
  );
};

export default SolanaTVL;
