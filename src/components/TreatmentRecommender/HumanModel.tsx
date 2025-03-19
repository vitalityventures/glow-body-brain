
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
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

interface HumanModelProps {
  onSelectArea: (area: string) => void;
  isFemale: boolean;
}

const HumanModel: React.FC<HumanModelProps> = ({ onSelectArea, isFemale }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full max-w-md mx-auto h-[70vh] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Human silhouette */}
      <motion.div 
        className="relative w-[300px] h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Base silhouette image */}
        <svg 
          viewBox="0 0 300 500" 
          className="w-full h-full stroke-spa-dark fill-none stroke-[0.5]"
        >
          {isFemale ? (
            // Female silhouette path
            <path d="M150,50 C130,50 115,65 115,85 C115,105 130,120 150,120 C170,120 185,105 185,85 C185,65 170,50 150,50 Z M150,120 C120,120 95,140 90,170 C85,200 90,230 100,250 L110,270 L110,320 L100,350 C95,380 100,400 110,420 L120,440 L120,480 L140,480 L140,440 L160,440 L160,480 L180,480 L180,440 L190,420 C200,400 205,380 200,350 L190,320 L190,270 L200,250 C210,230 215,200 210,170 C205,140 180,120 150,120 Z" />
          ) : (
            // Male silhouette path
            <path d="M150,50 C130,50 115,65 115,85 C115,105 130,120 150,120 C170,120 185,105 185,85 C185,65 170,50 150,50 Z M150,120 C120,120 95,140 90,170 C85,200 90,230 100,250 L110,270 L110,320 L100,370 C95,400 100,420 110,440 L120,480 L140,480 L140,400 L160,400 L160,480 L180,480 L180,440 C190,420 195,400 190,370 L180,320 L180,270 L190,250 C200,230 205,200 200,170 C195,140 180,120 150,120 Z" />
          )}
        </svg>

        {/* Hotspots - positioned absolutely */}
        <Hotspot top="15%" left="50%" label="Face" onClick={() => onSelectArea('face')} />
        <Hotspot top="32%" left="30%" label="Arms" onClick={() => onSelectArea('arms')} />
        <Hotspot top="32%" left="70%" label="Arms" onClick={() => onSelectArea('arms')} />
        <Hotspot top="40%" left="50%" label="Abdomen" onClick={() => onSelectArea('abdomen')} />
        <Hotspot top="55%" left="35%" label="Thighs" onClick={() => onSelectArea('thighs')} />
        <Hotspot top="55%" left="65%" label="Thighs" onClick={() => onSelectArea('thighs')} />
        <Hotspot top="75%" left="40%" label="Legs" onClick={() => onSelectArea('legs')} />
        <Hotspot top="75%" left="60%" label="Legs" onClick={() => onSelectArea('legs')} />
      </motion.div>

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
          <h3 className="text-spa-dark font-display text-xl mb-2">Click on an area</h3>
          <p className="text-spa-accent text-sm">Select a body part to view treatment options for that area</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HumanModel;
