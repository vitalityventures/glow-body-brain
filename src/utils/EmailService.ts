
/**
 * Email service utility for sending treatment plan data
 */

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
    // For demonstration, we're logging the data
    // In production, you would replace this with your actual email API call
    console.log('Sending email with data:', data);
    
    // Simulate API call to email service
    // Replace this with your preferred email service: EmailJS, SendGrid, Mailchimp, etc.
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        template_id: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        user_id: 'YOUR_USER_ID', // Replace with your EmailJS user ID
        template_params: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          newsletter: data.newsletter ? 'Yes' : 'No',
          treatmentPlan: data.treatmentPlan.map(item => 
            `${item.area}: ${item.concernLabel}`
          ).join(', '),
          to_email: 'your-admin-email@example.com' // Replace with recipient email
        }
      })
    });
    
    // If using the above EmailJS implementation, uncomment this
    // return response.status === 200;
    
    // For demo purposes, we'll simulate success
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
