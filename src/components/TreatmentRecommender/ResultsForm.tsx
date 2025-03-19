
import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultsFormProps {
  selectedConcerns: { area: string; concerns: string[] }[];
  onBack: () => void;
  onSubmit: (email: string, name: string) => void;
}

const ResultsForm: React.FC<ResultsFormProps> = ({
  selectedConcerns,
  onBack,
  onSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    
    setIsLoading(true);
    
    // Simulate submission delay
    setTimeout(() => {
      onSubmit(email, name);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const formatConcernText = (concerns: string[]) => {
    return concerns.join(', ');
  };

  const formatAreaName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {!isSubmitted ? (
        <>
          <motion.button
            className="flex items-center text-spa-accent hover:text-spa-dark transition-colors mb-6"
            onClick={onBack}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">Back</span>
          </motion.button>

          <motion.h2 
            className="text-3xl font-display text-spa-dark mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Your Personalized Treatment Plan
          </motion.h2>
          
          <motion.p 
            className="text-spa-accent mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Share your information to receive your customized treatment recommendations
          </motion.p>

          <motion.div 
            className="glass-panel rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-display text-spa-dark mb-4">Your Selected Concerns</h3>
            
            {selectedConcerns.map((item, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h4 className="font-medium text-spa-dark">{formatAreaName(item.area)}</h4>
                <p className="text-spa-accent text-sm">{formatConcernText(item.concerns)}</p>
              </div>
            ))}
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-spa-dark mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-spa-highlight focus:border-spa-accent focus:ring-1 focus:ring-spa-accent outline-none transition-all"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-spa-dark mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-spa-highlight focus:border-spa-accent focus:ring-1 focus:ring-spa-accent outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || !email || !name}
                className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-300 flex items-center justify-center ${
                  isLoading || !email || !name
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-spa-dark text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Sending...' : 'Send Treatment Plan'}
              </button>
            </div>
            
            <p className="text-xs text-center text-spa-accent">
              By submitting, you agree to be contacted regarding your treatment options.
              Your information is kept confidential.
            </p>
          </motion.form>
        </>
      ) : (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          
          <h2 className="text-3xl font-display text-spa-dark mb-3">Thank You!</h2>
          
          <p className="text-spa-accent mb-6 max-w-md mx-auto">
            Your personalized treatment plan has been sent to your email. 
            A specialist will be in touch with you shortly.
          </p>
          
          <button
            onClick={() => window.location.reload()}
            className="py-3 px-8 rounded-full font-medium bg-spa-dark text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Over
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultsForm;
