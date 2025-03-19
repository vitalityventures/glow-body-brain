
import { motion } from 'framer-motion';
import TreatmentRecommender from "../components/TreatmentRecommender/TreatmentRecommender";

const Index = () => {
  return (
    <div className="min-h-screen bg-spa-light">
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          <motion.h1 
            className="text-2xl md:text-3xl font-display text-spa-dark tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            AESTHETIC SURGERY
          </motion.h1>
        </div>
      </header>
      
      <main>
        <TreatmentRecommender />
      </main>
      
      <footer className="bg-white py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-spa-accent text-sm">
          <p>&copy; {new Date().getFullYear()} Aesthetic Surgery. All rights reserved.</p>
          <p className="mt-1">All virtual submissions are confidential.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
