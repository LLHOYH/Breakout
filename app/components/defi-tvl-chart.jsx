'use client'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useRef } from "react";

const DefiTVLChart = ({ tvl_volume_list, tvl_date_keys, dappName }) => {
  const chartRef = useRef();

  const options = {
    title: {
      text: `${dappName} TVL`,
      style: {
        color: "white",
      },
    },
    series: [
      {
        name: "Volume",
        type: "line",
        data: tvl_volume_list,
        color: "#D9D9D9",
        lineWidth: 1,
        marker: {
          radius: 8,
        },
      },
    ],
    xAxis: {
      title: {
        text: "Date (last 30 days)",
      },
      categories:tvl_date_keys,
      labels: {
        style: {
          color: "white",
          fontSize: "0.8rem",
        },
      },
    },
    yAxis: {
      title: {
        text: "Volume (USD)",
      },
      gridLineColor: "#496C6D",
      tickColor: "#fff",
      labels: {
        style: {
          color: "#8E8A8A",
        },
      },
    },
    chart: {
      backgroundColor: "black",
    },
    legend: {
      itemStyle: {
        color: "white",
      },
    },
  };

//   return <div></div>;
    return <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />;
};

export default DefiTVLChart;
