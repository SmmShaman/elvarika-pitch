import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Global error handlers to prevent unhandled rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent default browser behavior
});

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

createRoot(document.getElementById("root")!).render(<App />);
