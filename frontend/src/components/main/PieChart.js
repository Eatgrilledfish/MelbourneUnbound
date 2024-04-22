import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Plugin } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// 注册Chart.js所需的组件和插件
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const data = {
  labels: ['Walked all the way', 'Bus', 'Car', 'Tram', 'Train', 'Other', 'Cycled'],
  datasets: [
    {
      data: [50, 12, 29, 2, 6, 0, 1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(199, 199, 199, 0.8)'
      ],
      borderColor: [
        'white'
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
    datalabels: {
      color: '#fff',
      font: {
        weight: 'bold'
      },
      formatter: (value, context) => {
        return `${value}%`;
      }
    },
    title: {
      display: true,
      text: 'Access modes to non-CBD Melbourne train station (source: PTV OD surveys 2011-12)',
    },
  },
  animation: {
    animateScale: true,
    animateRotate: true
  }
};

export default function PieChart() {
  return <Pie data={data} options={options} />;
}
