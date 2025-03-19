
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
        {/* Use the uploaded face silhouette image */}
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/lovable-uploads/49f7be39-ec15-4190-82da-7c3c086c6be2.png"
            alt="Face silhouette"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Hotspots - positioned absolutely - adjusted for the new face image */}
        <Hotspot top="15%" left="50%" label="Forehead" onClick={() => onSelectArea('forehead')} />
        <Hotspot top="35%" left="30%" label="Eyes" onClick={() => onSelectArea('eyes')} />
        <Hotspot top="35%" left="70%" label="Eyes" onClick={() => onSelectArea('eyes')} />
        <Hotspot top="46%" left="50%" label="Nose" onClick={() => onSelectArea('nose')} />
        <Hotspot top="50%" left="25%" label="Cheeks" onClick={() => onSelectArea('cheeks')} />
        <Hotspot top="50%" left="75%" label="Cheeks" onClick={() => onSelectArea('cheeks')} />
        <Hotspot top="60%" left="50%" label="Mouth & Lips" onClick={() => onSelectArea('mouth')} />
        <Hotspot top="72%" left="50%" label="Jaw & Chin" onClick={() => onSelectArea('jaw')} />
        <Hotspot top="85%" left="50%" label="Neck" onClick={() => onSelectArea('neck')} />
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
