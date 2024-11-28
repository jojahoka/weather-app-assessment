import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Title,
  CategoryScale,
  ChartDataset,
} from "chart.js";
import { useCallback, useEffect, useRef } from "react";
import { LineChartProps } from "./types";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Title,
  CategoryScale
);

const LineChart = ({ labels, datasets }: LineChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const createChart = useCallback(
    (datasets: ChartDataset[], labels: string[]) => {
      if (!chartRef.current) return;

      return new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
          scales: {
            x: {
              border: {
                color: "#FFFFFF",
                display: true,
              },
              grid: {
                color: "#FFFFFF",
              },
              ticks: {
                color: "#FFFFFF",
                font: {
                  size: 8,
                },
              },
            },
            y: {
              border: {
                color: "#FFFFFF",
                display: true,
              },
              grid: {
                color: "#FFFFFF",
              },
              ticks: {
                color: "#FFFFFF",
                font: {
                  size: 8,
                },
              },
            },
          },
        },
      });
    },
    []
  );

  const updateChart = useCallback(
    (datasets: ChartDataset[], labels: string[]) => {
      if (!chartInstanceRef.current) return;

      const chart = chartInstanceRef.current;

      if (chart.data.labels !== labels) {
        chart.data.labels = labels;
      }

      datasets.forEach((newDataset, index) => {
        if (chart.data.datasets[index]) {
          Object.assign(chart.data.datasets[index], newDataset);
        } else {
          chart.data.datasets.push(newDataset);
        }
      });

      if (chart.data.datasets.length > datasets.length) {
        chart.data.datasets.splice(datasets.length);
      }

      chart.update();
    },
    []
  );

  useEffect(() => {
    if (!chartRef.current) return;
    if (!chartInstanceRef.current) {
      const newChart = createChart(datasets, labels);
      if (newChart) {
        chartInstanceRef.current = newChart;
      }
    } else {
      updateChart(datasets, labels);
    }
  }, [labels, datasets, createChart, updateChart]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
