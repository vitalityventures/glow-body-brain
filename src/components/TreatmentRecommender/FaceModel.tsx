
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
          className="w-full h-full stroke-spa-dark fill-none stroke-[0.5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <path d="M150,50 C110,50 80,90 80,140 C80,160 85,180 95,195 L105,220 C115,245 130,270 150,280 C170,270 185,245 195,220 L205,195 C215,180 220,160 220,140 C220,90 190,50 150,50 Z" />
          {/* Eyes */}
          <path d="M120,150 C125,145 135,145 140,150 C135,155 125,155 120,150 Z" />
          <path d="M160,150 C165,145 175,145 180,150 C175,155 165,155 160,150 Z" />
          {/* Nose */}
          <path d="M150,160 L150,180 M140,190 C145,195 155,195 160,190" />
          {/* Mouth */}
          <path d="M130,210 C140,220 160,220 170,210" />
        </motion.svg>

        {/* Hotspots - positioned absolutely */}
        <Hotspot top="20%" left="50%" label="Forehead" onClick={() => onSelectArea('forehead')} />
        <Hotspot top="40%" left="30%" label="Eyes" onClick={() => onSelectArea('eyes')} />
        <Hotspot top="40%" left="70%" label="Eyes" onClick={() => onSelectArea('eyes')} />
        <Hotspot top="50%" left="50%" label="Nose" onClick={() => onSelectArea('nose')} />
        <Hotspot top="60%" left="50%" label="Cheeks" onClick={() => onSelectArea('cheeks')} />
        <Hotspot top="70%" left="50%" label="Mouth & Lips" onClick={() => onSelectArea('mouth')} />
        <Hotspot top="80%" left="50%" label="Jaw & Chin" onClick={() => onSelectArea('jaw')} />
        <Hotspot top="60%" left="85%" label="Neck" onClick={() => onSelectArea('neck')} />
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
