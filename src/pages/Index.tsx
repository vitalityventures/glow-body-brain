
import { motion } from 'framer-motion';
import TreatmentRecommender from "../components/TreatmentRecommender/TreatmentRecommender";
import { Toaster } from "sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-spa-light">
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-2xl md:text-3xl font-display text-spa-dark tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            TREATMENT RECOMMENDER
          </motion.h1>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#about" className="text-spa-accent hover:text-spa-dark transition-colors">About</a>
            <a href="#treatments" className="text-spa-accent hover:text-spa-dark transition-colors">Treatments</a>
            <a href="#contact" className="text-spa-accent hover:text-spa-dark transition-colors">Contact</a>
          </nav>
        </div>
      </header>
      
      <main>
        <TreatmentRecommender />
      </main>
      
      <footer className="bg-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-spa-dark font-display text-lg mb-4">About Us</h3>
              <p className="text-spa-accent">
                Our treatment recommender provides personalized aesthetic treatment recommendations based on your unique concerns.
              </p>
            </div>
            
            <div>
              <h3 className="text-spa-dark font-display text-lg mb-4">Contact Info</h3>
              <p className="text-spa-accent mb-2">Email: info@treatmentrecommender.com</p>
              <p className="text-spa-accent mb-2">Phone: (555) 123-4567</p>
              <p className="text-spa-accent">Address: 123 Beauty Lane, Suite 100</p>
            </div>
            
            <div>
              <h3 className="text-spa-dark font-display text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-spa-accent hover:text-spa-dark transition-colors">Instagram</a>
                <a href="#" className="text-spa-accent hover:text-spa-dark transition-colors">Facebook</a>
                <a href="#" className="text-spa-accent hover:text-spa-dark transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-spa-accent text-sm">
            <p>&copy; {new Date().getFullYear()} Treatment Recommender. All rights reserved.</p>
            <p className="mt-1">All virtual submissions are confidential.</p>
          </div>
        </div>
      </footer>
      
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Index;
