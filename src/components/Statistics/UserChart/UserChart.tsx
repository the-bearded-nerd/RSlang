import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function UserChart(props: any) {
  const { wordStatistics } = props;
  console.log(wordStatistics);
  const labels = Object.keys(wordStatistics);
  const values = Object.values(wordStatistics);
  const values1 = [];
  let sum = 0;
  for (let i = 0; i < values.length; i += 1) {
    sum += values[i] as number;
    values1.push(sum);
  }
  console.log(labels, values);
  return (
    <div>
      <h3>Графиг</h3>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'Изучено за день',
              data: values,
              backgroundColor: 'rgba(153, 102, 255, 0.3)',
              borderColor: 'rgba(153, 102, 255, 1)',
            },
          ],
        }}
        height={200}
        width={300}
        options={{
          maintainAspectRatio: true,
          responsive: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'Изучено всего',
              data: values1,
              backgroundColor: 'rgba(255, 206, 86, 0.3)',
              borderColor: 'rgba(255, 206, 86, 1)',
            },
          ],
        }}
        height={200}
        width={300}
        options={{
          maintainAspectRatio: true,
          responsive: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default UserChart;
