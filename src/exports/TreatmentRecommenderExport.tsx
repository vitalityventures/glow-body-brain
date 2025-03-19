
import React from 'react';
import TreatmentRecommender from '../components/TreatmentRecommender/TreatmentRecommender';
import { Toaster } from 'sonner';
import '../index.css'; // Make sure to include your styles

// Configuration for the EmailJS service
export interface EmailServiceConfig {
  serviceId: string;
  templateId: string;
  userId: string;
  recipientEmail?: string;
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
