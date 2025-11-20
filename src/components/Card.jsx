// Card component for holding charts and metrics
function Card({ title, children, hasHeader = true }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4">
      {hasHeader && (
        <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-3">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button className="text-gray-400 hover:text-white">...</button>
        </div>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
}
export default Card;