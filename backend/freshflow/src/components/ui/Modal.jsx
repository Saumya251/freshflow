/**
 * Modal Component
 * @param {boolean} isOpen
 * @param {Function} onClose
 * @param {string} title
 * @param {React.ReactNode} children
 */
import { useEffect, useRef } from "react"

function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    modalRef.current?.focus()

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-xl p-6 w-full max-w-md outline-none"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal