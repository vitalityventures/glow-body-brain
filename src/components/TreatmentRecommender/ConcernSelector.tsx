import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ConcernOption } from './types';

interface ConcernSelectorProps {
  area: string;
  concerns: ConcernOption[];
  selectedConcerns: string[];
  onSelectConcern: (concernId: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const ConcernSelector: React.FC<ConcernSelectorProps> = ({
  area,
  concerns,
  selectedConcerns,
  onSelectConcern,
  onBack,
  onContinue
}) => {
  const formatAreaName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
        {formatAreaName(area)} Concerns
      </motion.h2>
      
      <motion.p 
        className="text-spa-accent mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Select all concerns that apply to you
      </motion.p>

      <motion.div 
        className="space-y-3 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {concerns.map((concern) => (
          <motion.div key={concern.id} variants={item}>
            <div className="concern-option">
              <input
                type="checkbox"
                id={concern.id}
                className="sr-only"
                checked={selectedConcerns.includes(concern.id)}
                onChange={() => onSelectConcern(concern.id)}
              />
              <label 
                htmlFor={concern.id}
                className={`flex items-center w-full p-3 rounded-lg cursor-pointer transition-all ${
                  selectedConcerns.includes(concern.id)
                    ? 'bg-spa-accent bg-opacity-10 border border-spa-accent'
                    : 'bg-white border border-gray-100 hover:border-spa-highlight'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border ${selectedConcerns.includes(concern.id) 
                  ? 'bg-spa-accent border-spa-accent' 
                  : 'border-spa-highlight'} mr-3 flex items-center justify-center transition-colors`}
                >
                  {selectedConcerns.includes(concern.id) && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3L4 7L2 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className={`text-spa-dark ${selectedConcerns.includes(concern.id) ? 'font-medium' : ''}`}>
                  {concern.label}
                </span>
              </label>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between"
      >
        <div className="hidden sm:block w-24">
          {/* Empty div for layout balance */}
        </div>
        
        <button
          className={`w-full sm:w-auto py-3 px-6 rounded-full font-medium transition-all duration-300 ${
            selectedConcerns.length > 0
              ? 'bg-spa-dark text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={onContinue}
          disabled={selectedConcerns.length === 0}
        >
          Continue
        </button>
        
        <div className="hidden sm:block w-24 text-right">
          <span className="text-sm text-spa-accent">
            {selectedConcerns.length} selected
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConcernSelector;
