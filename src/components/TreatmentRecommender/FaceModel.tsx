
import React, { useState } from 'react';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface HotspotProps {
  top: string;
  left: string;
  label: string;
  onClick: () => void;
}

const Hotspot: React.FC<HotspotProps> = ({ top, left, label, onClick }) => {
  return (
    <motion.div
      className="hotspot absolute z-10"
      style={{ top, left }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.2 }}
      title={label}
      onClick={onClick}
      role="button"
      aria-label={`Select ${label} area`}
    >
      <PlusCircle className="w-5 h-5 text-spa-accent" />
    </motion.div>
  );
};

interface FaceModelProps {
  onSelectArea: (area: string) => void;
  onBack: () => void;
}

const FaceModel: React.FC<FaceModelProps> = ({ onSelectArea, onBack }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto h-[70vh] flex items-center justify-center">
      <motion.button
        className="absolute top-4 left-4 flex items-center text-spa-accent hover:text-spa-dark transition-colors z-20"
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span className="text-sm">Back to full body</span>
      </motion.button>
      
      <div 
        className="relative w-[300px] h-[400px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Face outline */}
        <motion.svg 
          viewBox="0 0 300 400" 
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Face outline - more elegant and refined */}
          <path 
            d="M150,40 
               C190,40 220,70 230,110
               C240,150 240,190 230,230
               C220,270 200,300 170,320
               C160,325 155,330 150,340
               C145,330 140,325 130,320
               C100,300 80,270 70,230
               C60,190 60,150 70,110
               C80,70 110,40 150,40 Z"
            fill="#F5D0B1"
            stroke="#888"
            strokeWidth="1"
          />
          
          {/* Eyebrows */}
          <path d="M110,120 C120,115 130,115 140,118" 
            fill="none" stroke="#555" strokeWidth="1" />
          <path d="M160,118 C170,115 180,115 190,120" 
            fill="none" stroke="#555" strokeWidth="1" />
          
          {/* Eyes */}
          <ellipse cx="125" cy="135" rx="12" ry="6" 
            fill="white" stroke="#555" strokeWidth="1" />
          <ellipse cx="175" cy="135" rx="12" ry="6" 
            fill="white" stroke="#555" strokeWidth="1" />
          
          {/* Pupils */}
          <circle cx="125" cy="135" r="3" fill="#555" />
          <circle cx="175" cy="135" r="3" fill="#555" />
          
          {/* Nose */}
          <path d="M150,140 
                   C153,160 156,180 160,190
                   C155,195 145,195 140,190
                   C144,180 147,160 150,140"
                fill="none" stroke="#888" strokeWidth="1" />
          
          {/* Lips */}
          <path d="M130,220 C140,225 160,225 170,220" 
                fill="none" stroke="#888" strokeWidth="1" />
          <path d="M130,220 C140,215 160,215 170,220" 
                fill="none" stroke="#888" strokeWidth="1" />
          
          {/* Neck */}
          <path d="M120,340 C130,360 170,360 180,340" 
                fill="#F5D0B1" stroke="#888" strokeWidth="1" />
        </motion.svg>

        {/* Hotspots - positioned absolutely */}
        <Hotspot top="15%" left="50%" label="Forehead" onClick={() => onSelectArea('forehead')} />
        <Hotspot top="34%" left="30%" label="Eyes" onClick={() => onSelectArea('eyes')} />
        <Hotspot top="34%" left="70%" label="Eyes" onClick={() => onSelectArea('eyes')} />
        <Hotspot top="46%" left="50%" label="Nose" onClick={() => onSelectArea('nose')} />
        <Hotspot top="50%" left="25%" label="Cheeks" onClick={() => onSelectArea('cheeks')} />
        <Hotspot top="50%" left="75%" label="Cheeks" onClick={() => onSelectArea('cheeks')} />
        <Hotspot top="58%" left="50%" label="Mouth & Lips" onClick={() => onSelectArea('mouth')} />
        <Hotspot top="70%" left="50%" label="Jaw & Chin" onClick={() => onSelectArea('jaw')} />
        <Hotspot top="82%" left="50%" label="Neck" onClick={() => onSelectArea('neck')} />
      </div>

      {/* Instruction overlay */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0 : 0.9,
          scale: isHovered ? 0.9 : 1 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="glass-panel rounded-xl px-8 py-6 text-center max-w-xs">
          <h3 className="text-spa-dark font-display text-xl mb-2">Select facial area</h3>
          <p className="text-spa-accent text-sm">Click on a specific facial region to view treatment options</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FaceModel;
