import DefiTVLChart from "./defi-tvl-chart";

const options = { day: 'numeric', month: 'long', year: 'numeric' };

const DefiTVL = ({dapp_tvl,dappName}) => {
    if(!dapp_tvl) return false;

    //dapp_tvl will only contain the most recent 30 days

  let tvl_date_keys=[], tvl_volume_list=[];

  //filter out the tvl date, for category naming
  //filter out the price for high chart to connect the dots as a line
  dapp_tvl.forEach((tvl,index)=>{
    let formattedDate = new Date(Number(tvl.date)*1000).toLocaleDateString('en-GB',options);
    formattedDate=formattedDate.slice(0, -4) + formattedDate.slice(-2);
    tvl_date_keys.push(formattedDate);
    tvl_volume_list.push({name:formattedDate, color:index%2==0 ? "#00D5DA" : "#E48181", y:tvl.totalLiquidityUSD})
  });

  return (
    <div className="w-full p-3 bg-black border-2 border-black h-min rounded-2xl">
      <DefiTVLChart tvl_volume_list={tvl_volume_list} tvl_date_keys={tvl_date_keys} dappName={dappName} />
    </div>
  );
};

export default DefiTVL;
