
import React from 'react';
import TreatmentRecommender from '../components/TreatmentRecommender/TreatmentRecommender';
import { Toaster } from 'sonner';
import '../index.css'; // Make sure to include your styles
import { SiteConfig } from '../config/siteConfig';
import defaultSiteConfig from '../config/siteConfig';

// Configuration for the EmailJS service
export interface EmailServiceConfig {
  serviceId: string;
  templateId: string;
  userId: string;
  recipientEmail?: string;
  companyName?: string;
  clientSiteName?: string;
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

export default TreatmentRecommenderWidget;
