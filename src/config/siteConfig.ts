
// Site configuration file for Treatment Recommender
// Edit these values to customize the widget for different clients

export interface SiteConfig {
  // Branding
  title: string;
  subtitle: string;
  
  // Footer content
  aboutUsText: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  
  // Navigation visibility
  navigation: {
    showAbout: boolean;
    showTreatments: boolean;
    showIntegrationGuide: boolean;
  };
  
  // Copyright
  copyrightName: string;
}

// Default configuration
const siteConfig: SiteConfig = {
  // Branding
  title: "TREATMENT RECOMMENDER",
  subtitle: "Discover personalized aesthetic treatments tailored to your unique concerns",
  
  // Footer content
  aboutUsText: "Our treatment recommender provides personalized aesthetic treatment recommendations based on your unique concerns.",
  contactInfo: {
    email: "info@treatmentrecommender.com",
    phone: "(555) 123-4567",
    address: "123 Beauty Lane, Suite 100",
  },
  
  // Navigation visibility
  navigation: {
    showAbout: true,
    showTreatments: true,
    showIntegrationGuide: true, // Set to false to hide for client-facing sites
  },
  
  // Copyright
  copyrightName: "Treatment Recommender",
};

export default siteConfig;
