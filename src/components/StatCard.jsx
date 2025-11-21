export default function StatCard({ icon, title, value, change, color }) {
  return (
    <div
      className={`
        p-6 rounded-xl shadow-md bg-black/30 border-l-4 border-${color}-500
        transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl
      `}
    >
      <div className="flex items-center gap-4">
        <div
          className={`
            p-3 rounded-full bg-${color}-100 text-${color}-600
            transform transition-colors duration-300 ease-in-out hover:bg-${color}-200
          `}
        >
          {icon}
        </div>

        <div>
          <h4 className="text-white text-sm transition-colors duration-300 ease-in-out hover:text-${color}-400">
            {title}
          </h4>
          <p className="text-2xl font-bold transition-transform duration-300 ease-in-out hover:scale-105">
            {value}
          </p>

          <p
            className={`
              text-sm mt-1 transition-colors duration-300 ease-in-out
              ${change >= 0 ? "text-green-400" : "text-red-400"}
            `}
          >
            {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
          </p>
        </div>
      </div>
    </div>
  );
}
