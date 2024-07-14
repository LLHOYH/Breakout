import Image from "next/image";
import dapps from "../defillama-dapp.json";

const DefiList = ({setSelectedDapp}) => {
    return ( 
        <div
        id="left-content-defis"
        className="flex flex-col justify-start"
      >
        <p className="h-10 pl-2 text-2xl font-bold">Hot Dapps⭐️</p>
        {dapps.map((dapp) => (
          <div key={dapp.name} className="border-[1px] border-zinc-300 h-10 p-2 bg-black hover:bg-zinc-400 flex items-center justify-start gap-3 rounded-2xl"
           onClick={()=>setSelectedDapp(dapp)}
          >
            <Image src={dapp.img} alt={dapp.name} width={20} height={20} />
            <p>
              {dapp.name}
            </p>
          </div>
        ))}
      </div>
     );
}
 
export default DefiList;