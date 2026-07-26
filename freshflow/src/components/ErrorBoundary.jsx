import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f3f4f6" }}>
          <div style={{ background: "white", padding: "40px", borderRadius: "12px", textAlign: "center", maxWidth: "400px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "16px" }}>⚠️</div>
            <h2 style={{ color: "#1f2937", marginBottom: "8px" }}>Something went wrong</h2>
            <p style={{ color: "#6b7280", marginBottom: "20px" }}>An unexpected error occurred. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              style={{ background: "#16a34a", color: "white", padding: "10px 24px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "500" }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary