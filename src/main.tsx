
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create the root element and render the App
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found. Make sure there's an element with id 'root' in your HTML.");
}
