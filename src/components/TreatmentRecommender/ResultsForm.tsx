
import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TreatmentPlanItem {
  area: string;
  concernId: string;
  concernLabel: string;
}

interface ResultsFormProps {
  treatmentPlan: TreatmentPlanItem[];
  onBack: () => void;
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    newsletter: boolean;
  }) => void;
}

const ResultsForm: React.FC<ResultsFormProps> = ({
  treatmentPlan,
  onBack,
  onSubmit,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) return;
    
    setIsLoading(true);
    
    // Simulate submission delay
    setTimeout(() => {
      onSubmit({
        firstName,
        lastName,
        email,
        phone,
        newsletter
      });
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const formatAreaName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Group items by area for display
  const groupedItems = treatmentPlan.reduce((acc, item) => {
    if (!acc[item.area]) {
      acc[item.area] = [];
    }
    acc[item.area].push(item);
    return acc;
  }, {} as Record<string, TreatmentPlanItem[]>);

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
            <span className="text-sm">Back to Treatment Selection</span>
          </motion.button>

          <motion.div 
            className="text-center max-w-md mx-auto mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-display text-spa-dark mb-4">
              Almost done! 👋
            </h2>
            
            <p className="text-spa-accent mb-2">
              Enter your contact information to instantly receive your customized treatment plan!
            </p>
            
            <p className="text-spa-accent text-sm">
              All of your information will be kept private and only shared with your Treatment Recommender provider.
            </p>
          </motion.div>

          <motion.div 
            className="glass-panel rounded-xl p-6 mb-8 lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-display text-spa-dark mb-4">Your Selected Concerns</h3>
            
            {Object.entries(groupedItems).map(([area, items]) => (
              <div key={area} className="mb-4 last:mb-0">
                <h4 className="font-medium text-spa-dark">{formatAreaName(area)}</h4>
                <p className="text-spa-accent text-sm">
                  {items.map(item => item.concernLabel).join(', ')}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-spa-dark mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-spa-highlight focus:border-spa-accent focus:ring-1 focus:ring-spa-accent outline-none transition-all"
                placeholder="First Name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-spa-dark mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-spa-highlight focus:border-spa-accent focus:ring-1 focus:ring-spa-accent outline-none transition-all"
                placeholder="Last Name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-spa-dark mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-spa-highlight focus:border-spa-accent focus:ring-1 focus:ring-spa-accent outline-none transition-all"
                placeholder="name@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-spa-dark mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-spa-highlight focus:border-spa-accent focus:ring-1 focus:ring-spa-accent outline-none transition-all"
                placeholder="(___) ___-____"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="h-4 w-4 text-spa-accent focus:ring-spa-accent border-gray-300 rounded"
              />
              <label htmlFor="newsletter" className="ml-2 block text-sm text-spa-dark">
                Sign up for our newsletter
              </label>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || !firstName || !lastName || !email || !phone}
                className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-300 flex items-center justify-center ${
                  isLoading || !firstName || !lastName || !email || !phone
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
                {isLoading ? 'Sending...' : 'Get My Results'}
              </button>
            </div>
            
            <p className="text-xs text-center text-spa-accent pt-4">
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
