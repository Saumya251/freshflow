/**
 * Button Component
 * @param {React.ReactNode} children
 * @param {"primary"|"secondary"|"outline"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} disabled
 * @param {Function} onClick
 */
function Button({ children, variant = "primary", size = "md", disabled = false, onClick }) {
  const baseStyles = "rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-green-600 text-green-600 hover:bg-green-50",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  )
}

export default Button