
/**
 * Email service utility for sending treatment plan data
 */
import { getEmailServiceConfig } from '../exports/TreatmentRecommenderExport';

interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  newsletter: boolean;
  treatmentPlan: Array<{
    area: string;
    concernId: string;
    concernLabel: string;
  }>;
}

export const sendTreatmentPlanEmail = async (data: EmailData): Promise<boolean> => {
  try {
    // Get the email service configuration
    const config = getEmailServiceConfig();
    
    if (!config) {
      console.error('Email service not configured. Please call configureEmailService first.');
      return false;
    }
    
    console.log('Sending email with data:', data);
    
    // Format the treatment plan for better readability
    const formattedTreatmentPlan = data.treatmentPlan.map(item => 
      `${item.area}: ${item.concernLabel}`
    ).join('\n');
    
    // Get hostname of the parent page if in an iframe
    let parentURL = "Not available";
    try {
      if (window.parent !== window) {
        // We're in an iframe
        parentURL = document.referrer || "Unknown";
      } else {
        parentURL = window.location.href;
      }
    } catch (e) {
      console.log('Could not determine parent URL due to cross-origin restrictions');
    }
    
    // Send email directly to the client's EmailJS account
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.userId,
        template_params: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          newsletter: data.newsletter ? 'Yes' : 'No',
          treatmentPlan: formattedTreatmentPlan,
          timestamp: new Date().toLocaleString(),
          source: parentURL // Include the source page URL
        }
      })
    });
    
    // Check if the email was sent successfully
    if (response.status === 200) {
      console.log('Email sent successfully!');
      return true;
    } else {
      console.error('Failed to send email:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
