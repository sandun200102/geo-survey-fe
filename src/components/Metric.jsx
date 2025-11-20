function MetricCard({ title, value, icon, color, change }) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className={`text-xs font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
        <span className={`text-3xl ${color}`}>{icon}</span>
      </div>
      {/* You'd add the small bar graph placeholder here */}
    </div>
  );
}
export default MetricCard;