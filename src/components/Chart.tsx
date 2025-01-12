import { Line } from "react-chartjs-2";

interface ChartProps {
  title: string;
  data: number[];
}

export default function Chart({ title, data }: ChartProps) {
  const chartData = {
    labels: data.map((_, i) => `T${i}`),
    datasets: [
      {
        label: title,
        data: data,
        borderColor: "rgb(75, 192, 192)",
        fill: false,
      },
    ],
  };

  return (
    <div style={{ width: "45%" }}>
      <h3>{title}</h3>
      <Line data={chartData} />
    </div>
  );
}
