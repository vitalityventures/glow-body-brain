
import { motion } from 'framer-motion';
import TreatmentRecommender from "../components/TreatmentRecommender/TreatmentRecommender";
import { Toaster } from "sonner";
import { getSiteConfig } from "../exports/TreatmentRecommenderExport";

const Index = () => {
  const siteConfig = getSiteConfig();
  
  return (
    <div className="min-h-screen bg-spa-light">
      {siteConfig.layout.showHeader && (
        <header className="bg-white py-4 px-6 shadow-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <motion.h1 
              className="text-2xl md:text-3xl font-display text-spa-dark tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {siteConfig.title}
            </motion.h1>
            
            <nav className="hidden md:flex space-x-6">
              {siteConfig.navigation.showAbout && (
                <a href="#about" className="text-spa-accent hover:text-spa-dark transition-colors">About</a>
              )}
              {siteConfig.navigation.showTreatments && (
                <a href="#treatments" className="text-spa-accent hover:text-spa-dark transition-colors">Treatments</a>
              )}
              {siteConfig.navigation.showIntegrationGuide && (
                <a href="/integration-example.html" className="text-spa-accent hover:text-spa-dark transition-colors" target="_blank">Integration Guide</a>
              )}
            </nav>
          </div>
        </header>
      )}
      
      <main>
        <TreatmentRecommender />
      </main>
      
      {siteConfig.layout.showFooter && (
        <footer className="bg-white py-10 mt-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-spa-dark font-display text-lg mb-4">About Us</h3>
                <p className="text-spa-accent">
                  {siteConfig.aboutUsText}
                </p>
              </div>
              
              <div>
                <h3 className="text-spa-dark font-display text-lg mb-4">Contact Info</h3>
                <p className="text-spa-accent mb-2">Email: {siteConfig.contactInfo.email}</p>
                <p className="text-spa-accent mb-2">Phone: {siteConfig.contactInfo.phone}</p>
                <p className="text-spa-accent">Address: {siteConfig.contactInfo.address}</p>
              </div>
              
              <div>
                <h3 className="text-spa-dark font-display text-lg mb-4">Integration</h3>
                <p className="text-spa-accent mb-2">
                  This treatment recommender can be embedded in any website!
                </p>
                {siteConfig.navigation.showIntegrationGuide && (
                  <a 
                    href="/integration-example.html" 
                    className="text-spa-accent underline hover:text-spa-dark transition-colors"
                    target="_blank"
                  >
                    View Integration Guide
                  </a>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-spa-accent text-sm">
              <p>&copy; {new Date().getFullYear()} {siteConfig.copyrightName}. All rights reserved.</p>
              <p className="mt-1">All virtual submissions are confidential.</p>
            </div>
          </div>
        </footer>
      )}
      
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Index;
