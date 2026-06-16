import StatusBadge from "./StatusBadge"

function ProductCard({ name, origin, status, date }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-500 mt-1">Origin: {origin}</p>
      <p className="text-sm text-gray-500">Date: {date}</p>
      <div className="mt-3">
        <StatusBadge status={status} />
      </div>
    </div>
  )
}

export default ProductCard