// EquipmentBarChart.jsx
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import equipmentStore from '../store/equipStore';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Colors
const statusColors = {
  available: 'rgba(54, 162, 235, 0.8)',
  booked: 'rgba(255, 159, 64, 0.8)',
  maintenance: 'rgba(255, 99, 132, 0.8)'
};

// Size map
const sizeMap = {
  xs: 'max-w-xs',
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
};

const EquipmentBarChart = ({ size = 'sm' }) => {
  const [stats, setStats] = useState(equipmentStore.getEquipmentStats());

  useEffect(() => {
    const updateStats = () => setStats(equipmentStore.getEquipmentStats());
    const unsubscribe = equipmentStore.subscribe(updateStats);
    equipmentStore.fetchEquipment();
    return () => unsubscribe();
  }, []);

  // Chart Data
  const chartData = {
    labels: ['Available', 'Booked', 'Maintenance'],
    datasets: [
      {
        label: 'Item Count',
        data: [stats.available, stats.booked, stats.maintenance],
        backgroundColor: [
          statusColors.available,
          statusColors.booked,
          statusColors.maintenance,
        ],
        borderColor: [
          statusColors.available.replace('0.8', '1'),
          statusColors.booked.replace('0.8', '1'),
          statusColors.maintenance.replace('0.8', '1'),
        ],
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(255,255,255,0.2)',
      },
    ],
  };

  // Chart Options — ALL TEXT WHITE
  const chartOptions = {
    responsive: true,
    animation: { duration: 800, easing: 'easeInOutQuart' },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { 
          color: 'white',
          font: { size: 14 }
        },
      },
      title: {
        display: true,
        text: `Inventory Status Overview`,
        color: 'white',
        font: { size: 12, weight: 'bold' },
        padding: { top: 10, bottom: 20 }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        bodyFont: { size: 12 },
        callbacks: {
          label: ({ label, raw }) => `${label}: ${raw} items`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.2)' },
        ticks: { 
          color: 'white',
          precision: 0, 
          font: { size: 12 } 
        },
        title: { 
          display: true, 
          text: 'Number of Items',
          color: 'white',
          font: { weight: 'bold' } 
        }
      },
      x: {
        grid: { display: false },
        ticks: { 
          color: 'white',
          font: { size: 12 }
        }
      }
    }
  };

  // Tailwind container styles
  const sizeClass = sizeMap[size] || sizeMap['md'];

  const containerClasses = `
    ${sizeClass}
    mx-auto
    my-8
    p-6
    bg-black/30
    shadow-xl
    rounded-xl
    font-sans
    text-white
  `;

  const totalTextClasses = `
    text-center
    mt-6
    pt-4
    border-t
    border-gray-300/40
    text-sm
    font-bold
    text-white
  `;

  const totalValueAmountClasses = `text-green-400 ml-2`;

  // Handle loading state
  if (equipmentStore.getState().isLoading) {
    return <div className={containerClasses}>Loading equipment data...</div>;
  }

  if (equipmentStore.getState().error) {
    return (
      <div className={`${containerClasses} border border-red-400 text-red-300`}>
        Error loading data: {equipmentStore.getState().error}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      

      <Bar data={chartData} options={chartOptions} />

      <p className={totalTextClasses}>
        Total Equipment Value:
        <span className={totalValueAmountClasses}>
          ${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </p>
    </div>
  );
};

export default EquipmentBarChart;
