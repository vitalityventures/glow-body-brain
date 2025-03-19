
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
      {/* Human image */}
      <motion.div 
        className="relative w-[240px] h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full h-full">
          {/* Use the image you provided instead of SVG */}
          <img
            src={isFemale ? "/female-silhouette.png" : "/male-silhouette.png"}
            alt={isFemale ? "Female body silhouette" : "Male body silhouette"}
            className="w-full h-full object-contain"
          />

          {/* Hotspots - positioned absolutely */}
          <Hotspot top="8%" left="50%" label="Face" onClick={() => onSelectArea('face')} />
          <Hotspot top="32%" left="25%" label="Arms" onClick={() => onSelectArea('arms')} />
          <Hotspot top="32%" left="75%" label="Arms" onClick={() => onSelectArea('arms')} />
          <Hotspot top="40%" left="50%" label="Abdomen" onClick={() => onSelectArea('abdomen')} />
          <Hotspot top="55%" left="35%" label="Thighs" onClick={() => onSelectArea('thighs')} />
          <Hotspot top="55%" left="65%" label="Thighs" onClick={() => onSelectArea('thighs')} />
          <Hotspot top="75%" left="40%" label="Legs" onClick={() => onSelectArea('legs')} />
          <Hotspot top="75%" left="60%" label="Legs" onClick={() => onSelectArea('legs')} />
        </div>
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
          <p className="text-spa-accent text-sm">Select a body region to view treatment options</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HumanModel;
