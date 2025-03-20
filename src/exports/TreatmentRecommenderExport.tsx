
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

// Main export component that can be embedded in any website
const TreatmentRecommenderWidget = () => {
  return (
    <div className="treatment-recommender-widget">
      <TreatmentRecommender />
      <Toaster position="top-right" richColors />
    </div>
  );
};

// For browser compatibility, assign everything to the default export
const TreatmentRecommender_Export = {
  Widget: TreatmentRecommenderWidget,
  configureEmailService,
  configureSiteSettings,
  getSiteConfig,
  getEmailServiceConfig
};

// Export as both default and named for maximum compatibility
export default TreatmentRecommender_Export;

// Also attach to window for direct browser usage
if (typeof window !== 'undefined') {
  // @ts-ignore - adding property to window
  window.TreatmentRecommender = TreatmentRecommender_Export;
}
