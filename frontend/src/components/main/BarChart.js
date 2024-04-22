import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// 注册Chart.js所需的组件
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // 不显示图例
    },
    datalabels: {
        display: false,
      },
    tooltip: {
      enabled: true, // 启用提示框
      mode: 'index',
      intersect: false, // 当鼠标悬停时显示所有数据点的提示框
    },
    title: {
      display: true,
      text: 'Accessibility Rating Distribution',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Accessibility Rating'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Count'
      }
    }
  },
  animation: {
    duration: 1000, // 动画持续时间，以毫秒为单位
    easing: 'easeOutBounce', // 动画缓动函数
    onComplete: () => console.log('Animation completed!') // 动画完成时的回调函数
  }
};

const labels = ['0', '1', '2', '3'];

const data = {
  labels,
  datasets: [
    {
      label: 'Count',
      data: [337309, 157037, 499526, 116730], // 请按照您数据的顺序进行调整
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
    }
  ],
};

export default function BarChart() {
  return <Bar options={options} data={data} />;
}
