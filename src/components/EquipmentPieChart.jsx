// EquipmentPieChart.jsx (Tailwind CSS Version)
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import equipmentStore from '../store/equipStore'

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define Colors for Consistency (Tailwind-friendly palette for Chart.js)
const chartColors = {
    available: 'rgb(59, 130, 246)',    // Blue-500
    booked: 'rgb(245, 158, 11)',       // Amber-500
    maintenance: 'rgb(239, 68, 68)'    // Red-500
};

const EquipmentPieChart = () => {
  const [stats, setStats] = useState(equipmentStore.getEquipmentStats());

  useEffect(() => {
    const updateStats = () => setStats(equipmentStore.getEquipmentStats());
    const unsubscribe = equipmentStore.subscribe(updateStats);
    equipmentStore.fetchEquipment(); 
    return unsubscribe;
  }, []);

  // --- Data Transformation ---
  const data = {
    labels: ['Available', 'Booked', 'Maintenance'],
    datasets: [{
      label: 'Items',
      data: [stats.available, stats.booked, stats.maintenance],
      backgroundColor: [chartColors.available, chartColors.booked, chartColors.maintenance],
      borderColor: ['#fff', '#fff', '#fff'], // White border for separation
      borderWidth: 2,
      hoverOffset: 12,
    }],
  };

  // --- Simplified Chart Options ---
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }, // Moved to bottom for better centering in a small container
      title: { 
        display: true, 
        text: `Status Distribution (Total: ${stats.total})`,
        font: { size: 14 }
      },
      tooltip: {
        callbacks: {
            label: ({ label, raw, total }) => {
                const percentage = ((raw / total) * 100).toFixed(1);
                return `${label}: ${raw} (${percentage}%)`;
            }
        }
      }
    },
    animation: { duration: 800 }
  };
  
  // Display loading/error status with Tailwind classes
  if (equipmentStore.getState().isLoading) {
    return (
      <div className="max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md text-center text-blue-600">
        Loading equipment data...
      </div>
    );
  }
  
  if (equipmentStore.getState().error) {
    return (
      <div className="max-w-xs mx-auto p-4 bg-red-100 rounded-lg shadow-md text-center text-red-700">
        Error: {equipmentStore.getState().error}
      </div>
    );
  }

  return (
    // Tailwind Container Classes:
    // max-w-sm: Maximum width (small)
    // mx-auto: Center horizontally
    // p-4: Padding
    // bg-white: White background
    // rounded-xl: Large rounded corners
    // shadow-lg: Large shadow
    // font-sans: Default font stack
    <div className="max-w-sm mx-auto p-4 bg-white rounded-xl shadow-lg font-sans">
      <h3 className="text-center text-lg font-semibold text-gray-800 mb-3">
          Equipment Status Breakdown
      </h3>
      
      {stats.total > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <p className="text-center text-gray-500 p-4">No equipment data to display.</p>
      )}

      <p className="text-center mt-4 pt-3 border-t border-gray-200 text-sm text-gray-700">
        Total Value: 
        <span className="font-bold text-green-600 ml-1">
          ${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </p>
    </div>
  );
};

export default EquipmentPieChart;