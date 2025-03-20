
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
  try {
    localStorage.setItem('emailServiceConfig', JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save email config to localStorage:', e);
  }
  
  console.log('Email service configured:', config);
};

// Retrieves the current email configuration
export const getEmailServiceConfig = (): EmailServiceConfig | null => {
  if (emailConfig) return emailConfig;
  
  // Try to load from localStorage if not set
  try {
    const savedConfig = localStorage.getItem('emailServiceConfig');
    if (savedConfig) {
      emailConfig = JSON.parse(savedConfig);
      return emailConfig;
    }
  } catch (e) {
    console.error('Failed to parse email config from localStorage:', e);
  }
  
  return null;
};

// Store the site configuration globally
let siteConfig: SiteConfig = defaultSiteConfig;

// Configure site settings for the widget
export const configureSiteSettings = (config: Partial<SiteConfig>) => {
  // For embedded widgets, default to hiding header and footer
  const isEmbedded = window !== window.top; // Check if running in an iframe
  
  const layoutDefaults = isEmbedded ? 
    { showHeader: false, showFooter: false } : 
    { showHeader: true, showFooter: true };
  
  // Merge with default config, with layout detection
  siteConfig = { 
    ...defaultSiteConfig, 
    ...config,
    layout: {
      ...defaultSiteConfig.layout,
      ...layoutDefaults,
      ...(config.layout || {})
    }
  };
  
  // Update in localStorage for persistence
  try {
    localStorage.setItem('siteConfig', JSON.stringify(siteConfig));
  } catch (e) {
    console.error('Failed to save site config to localStorage:', e);
  }
  
  console.log('Site configuration updated:', siteConfig);
  
  // Instead of force reloading, just inform that settings have been updated
  console.log('Configuration complete - refresh to apply all changes');
};

// Get current site config
export const getSiteConfig = (): SiteConfig => {
  // Try to load from localStorage
  try {
    const savedConfig = localStorage.getItem('siteConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      siteConfig = { ...defaultSiteConfig, ...parsedConfig };
    }
  } catch (e) {
    console.error('Failed to parse site config from localStorage:', e);
  }
  
  return siteConfig;
};

// Main Widget Component
const TreatmentRecommenderWidget = () => {
  return (
    <div className="treatment-recommender-widget">
      <TreatmentRecommender />
      <Toaster position="top-right" richColors />
    </div>
  );
};

// Define all widget exports in a predictable structure
const Widget = TreatmentRecommenderWidget;

// Create a clear exports object
const TreatmentRecommenderExport = {
  Widget,
  configureEmailService,
  configureSiteSettings,
  getSiteConfig,
  getEmailServiceConfig,
  // Add version information
  version: '1.0.0',
  buildDate: new Date().toISOString()
};

// Export the complete widget object as default
export default TreatmentRecommenderExport;

// Also export individual components for named imports
export { 
  Widget,
  TreatmentRecommenderWidget
  // Remove duplicate exports of configureSiteSettings and configureEmailService
  // since they're already exported above
};

// Attach to window for direct browser usage with improved consistency
if (typeof window !== 'undefined') {
  console.log('Attaching TreatmentRecommender to window object');
  
  // Attach as TreatmentRecommender for the main access
  // @ts-ignore - adding property to window
  window.TreatmentRecommender = TreatmentRecommenderExport;
  
  // Also add as treatmentRecommender (lowercase) for backup
  // @ts-ignore - adding property to window
  window.treatmentRecommender = TreatmentRecommenderExport;
}

// For direct rendering via script tags
export function render(container: HTMLElement) {
  if (container) {
    import('react-dom/client').then(({ createRoot }) => {
      const root = createRoot(container);
      root.render(<TreatmentRecommenderWidget />);
      console.log('Widget rendered into container:', container);
    });
  }
}
