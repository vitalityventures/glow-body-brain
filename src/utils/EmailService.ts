
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
    
    // Send email using EmailJS
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
          treatmentPlan: data.treatmentPlan.map(item => 
            `${item.area}: ${item.concernLabel}`
          ).join(', '),
          to_email: config.recipientEmail || 'your-admin-email@example.com'
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
