/**
 * Input Component
 * @param {string} label
 * @param {string} placeholder
 * @param {string} type
 * @param {string} value
 * @param {Function} onChange
 * @param {string} error
 */
function Input({ label, placeholder, type = "text", value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-green-200"
        }`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}

export default Input