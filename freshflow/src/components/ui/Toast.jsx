/**
 * Toast Utility
 * @param {string} message
 * @param {"success"|"error"} type
 */
import toast, { Toaster } from "react-hot-toast"

export function showToast(message, type = "success") {
  if (type === "success") toast.success(message)
  else if (type === "error") toast.error(message)
  else toast(message)
}

export function ToastContainer() {
  return <Toaster position="top-right" />
}