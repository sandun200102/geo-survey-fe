import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'; // Import icons for visual key
import useBookingStore from '../store/bookingStore';
// Define the data shape based on the stats object
const getChartData = (stats) => [
  { 
    name: 'Pending', 
    count: stats.pending, 
    fill: '#fcd34d', // Tailwind yellow-400
    icon: <AlertCircle className="w-4 h-4 text-yellow-600" />
  },
  { 
    name: 'Confirmed', 
    count: stats.confirmed, 
    fill: '#60a5fa', // Tailwind blue-400
    icon: <CheckCircle className="w-4 h-4 text-blue-600" />
  },
  { 
    name: 'Completed', 
    count: stats.completed, 
    fill: '#4ade80', // Tailwind green-400
    icon: <CheckCircle className="w-4 h-4 text-green-600" />
  },
  { 
    name: 'Cancelled', 
    count: stats.cancelled, 
    fill: '#f87171', // Tailwind red-400
    icon: <XCircle className="w-4 h-4 text-red-600" />
  },
];

// Custom Tooltip for better hover information
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 text-white p-3 rounded-lg shadow-lg border border-white/20">
        <p className="font-bold text-lg">{label}</p>
        <p className="text-blue-300">{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BookingStatsBarChart = () => {
  
   const { getBookingStats} = useBookingStore();
    const stats = getBookingStats();
    const data = getChartData(stats);
  
  // Set a good maximum Y-axis domain based on the largest count + a buffer
  const maxCount = Math.max(...data.map(item => item.count));
  const yDomain = [0, maxCount > 0 ? maxCount + Math.ceil(maxCount * 0.2) : 5]; 

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg h-78 w-100">
      <h3 className="text-xs font-semibold text-white mb-4">Booking Status Overview 📊</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -20, // Adjusted to make room for Y-axis numbers
            bottom: 5,
          }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
          <XAxis 
            dataKey="name" 
            stroke="#ccc" // Lighter text for dark background
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            domain={yDomain} 
            stroke="#ccc" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false} // Ensure whole numbers for counts
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} // Lighter cursor for contrast
          />
          <Bar dataKey="count" name="Bookings" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              // Fill color is dynamically set by getChartData
              <Bar key={`bar-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingStatsBarChart;