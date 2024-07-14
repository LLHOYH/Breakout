export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dappId = searchParams.get("dappId");
  const dappName = searchParams.get("dappName");

  console.log(("DAPPNAME-------------------------------------",dappName))
  let llama_result = await fetchFromDefiLlama(dappName);

  // let radar_result = await fetchFromDappRadar(dappId);

  return Response.json(llama_result);
}

async function fetchFromDappRadar(dappId){
  const res = await fetch(`https://apis.dappradar.com/v2/dapps/${dappId}`, {
    headers: {
      accept: "application/json",
      "x-api-key": process.env.DAPPRADAR_API_KEY,
    },
    next: {
      revalidate: 3600 * 24,
    },
  });
  if (!res.ok) {
    return {
      success: false,
      error: "fetch failed",
    };
  }
  const result = await res.json();
  if (!result.success)
    return {
      success: false,
      error: "fetch failed",
    };

  return {
    success: true,
    name: result.results.name,
    website: result.results.website,
    categories: result.results.categories,
    metrics: result.results.metrics,
  };
}

async function fetchFromDefiLlama(dappName){
  const res = await fetch(`https://api.llama.fi/protocol/${dappName}`, {
    headers: {
      accept: "*/*"
    },
    next: {
      revalidate: 3600 * 24,
    },
  });
  console.log("------------!!!!!!!!!!!--------------")
  console.log("res OK?", res.ok)
  if (!res.ok) {
    return {
      success: false,
      error: "fetch failed",
    };
  }
  
  const result = await res.json();

  if (!result)
    return {
      success: false,
      error: "fetch failed",
    };

    return {
      success: true,
      name: result.name,
      mcap:result.mcap ?? 0,
      symbol:result.symbol,
      website: result.url,
      categories: result.categories,
      twitter: result.twitter,
      tokens:Object.entries(result.tokens?.slice(-1)[0].tokens) ?? [],
      tvl:result.tvl.slice(-30)
    }
}