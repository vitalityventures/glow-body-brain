
import React from 'react';
import TreatmentRecommender from '../components/TreatmentRecommender/TreatmentRecommender';
import { Toaster } from 'sonner';
import '../index.css'; // Make sure to include your styles
import { SiteConfig } from '../config/siteConfig';
import defaultSiteConfig from '../config/siteConfig';

// Configuration for the client's EmailJS service
export interface EmailServiceConfig {
  serviceId: string;
  templateId: string;
  userId: string;
}

// Set up the email configuration globally
let emailConfig: EmailServiceConfig | null = null;

export const configureEmailService = (config: EmailServiceConfig) => {
  emailConfig = config;
  
  // Update the configuration in localStorage so it persists
  localStorage.setItem('emailServiceConfig', JSON.stringify(config));
  
  console.log('Email service configured:', config);
};

// Retrieves the current email configuration
export const getEmailServiceConfig = (): EmailServiceConfig | null => {
  if (emailConfig) return emailConfig;
  
  // Try to load from localStorage if not set
  const savedConfig = localStorage.getItem('emailServiceConfig');
  if (savedConfig) {
    try {
      emailConfig = JSON.parse(savedConfig);
      return emailConfig;
    } catch (e) {
      console.error('Failed to parse email config from localStorage:', e);
    }
  }
  
  return null;
};

// Store the site configuration globally
let siteConfig: SiteConfig = defaultSiteConfig;

// Configure site settings for the widget
export const configureSiteSettings = (config: Partial<SiteConfig>) => {
  // Merge with default config
  siteConfig = { ...defaultSiteConfig, ...config };
  
  // Update in localStorage for persistence
  localStorage.setItem('siteConfig', JSON.stringify(siteConfig));
  
  console.log('Site configuration updated:', siteConfig);
  
  // Force refresh to apply changes
  window.location.reload();
};

// Get current site config
export const getSiteConfig = (): SiteConfig => {
  // Try to load from localStorage
  const savedConfig = localStorage.getItem('siteConfig');
  if (savedConfig) {
    try {
      const parsedConfig = JSON.parse(savedConfig);
      siteConfig = { ...defaultSiteConfig, ...parsedConfig };
    } catch (e) {
      console.error('Failed to parse site config from localStorage:', e);
    }
  }
  
  return siteConfig;
};

// Main export component that can be embedded in any website
const TreatmentRecommenderWidget = () => {
  return (
    <div className="treatment-recommender-widget">
      <TreatmentRecommender />
      <Toaster position="top-right" richColors />
    </div>
  );
};

// Sample initialization script for documentation purposes
const initializeWidgetScript = `
<!-- Include React and ReactDOM -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>

<!-- Include the widget script -->
<script src="path/to/treatment-recommender.umd.js"></script>
<link rel="stylesheet" href="path/to/treatment-recommender.css">

<!-- Create a container for the widget -->
<div id="treatment-recommender-container"></div>

<script>
  // Configure widget settings (optional)
  TreatmentRecommender.configureSiteSettings({
    title: "YOUR BRAND NAME",
    subtitle: "Your custom subtitle here",
    copyrightName: "Your Brand"
  });
  
  // Configure email service (required for form submissions)
  TreatmentRecommender.configureEmailService({
    serviceId: "your_emailjs_service_id",
    templateId: "your_emailjs_template_id",
    userId: "your_emailjs_user_id"
  });
  
  // Render the widget
  const container = document.getElementById('treatment-recommender-container');
  ReactDOM.createRoot(container).render(
    React.createElement(TreatmentRecommender.default)
  );
</script>
`;

// For documentation purposes only - not actually executed
console.info("Widget initialization example:", initializeWidgetScript);

export default TreatmentRecommenderWidget;
