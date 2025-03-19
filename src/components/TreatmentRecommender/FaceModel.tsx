
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
      <PlusCircle className="w-4 h-4 text-spa-accent" />
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
    <div className="relative w-full max-w-md mx-auto h-[70vh] flex flex-col items-center justify-center">
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

        {/* Hotspots - positioned absolutely - refined positions */}
        <Hotspot top="18%" left="48%" label="Forehead" onClick={() => onSelectArea('forehead')} />
        <Hotspot top="32%" left="30%" label="Eyes" onClick={() => onSelectArea('eyes')} />
        <Hotspot top="32%" left="65%" label="Eyes" onClick={() => onSelectArea('eyes')} />
        <Hotspot top="45%" left="48%" label="Nose" onClick={() => onSelectArea('nose')} />
        <Hotspot top="48%" left="25%" label="Cheeks" onClick={() => onSelectArea('cheeks')} />
        <Hotspot top="48%" left="70%" label="Cheeks" onClick={() => onSelectArea('cheeks')} />
        <Hotspot top="62%" left="48%" label="Mouth & Lips" onClick={() => onSelectArea('mouth')} />
        <Hotspot top="74%" left="48%" label="Jaw & Chin" onClick={() => onSelectArea('jaw')} />
        <Hotspot top="88%" left="48%" label="Neck" onClick={() => onSelectArea('neck')} />
      </div>
    </div>
  );
};

export default FaceModel;
