import React from "react";
import ReactApexChart from "react-apexcharts";

const GenderChart = (props) => {
  const { totalMales, totalFemales } = props;

  const series = [totalMales, totalFemales];

  const options = {
    chart: {
      type: "pie",
    },
    labels: ["Males", "Females"],
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default GenderChart;
