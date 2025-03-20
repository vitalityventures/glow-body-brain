
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Helper function to handle path detection
function detectBasePath() {
  const { hostname, pathname } = window.location;
  
  // Debug information
  console.log("Loading application with:", {
    hostname,
    pathname,
    fullUrl: window.location.href
  });
  
  // Set up base path for GitHub Pages if needed
  if (hostname.includes('github.io') || hostname.includes('lovable.app')) {
    const pathSegments = pathname.split('/');
    if (pathSegments.length > 1 && pathSegments[1] !== '') {
      console.log(`GitHub Pages or Preview detected. Path prefix: ${pathSegments[1]}`);
      return `/${pathSegments[1]}/`;
    }
  }
  
  // Default for local development or custom domain
  return '/';
}

// Make the base path available globally
window.BASE_PATH = detectBasePath();
console.log("Application base path set to:", window.BASE_PATH);

// Export the App component for possible direct imports
export { App };

// Create the root element and render the App
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
  console.log("Application rendered successfully");
} else {
  console.error("Root element not found. Make sure there's an element with id 'root' in your HTML.");
}
