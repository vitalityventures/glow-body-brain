
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
      <PlusCircle className="w-4 h-4 text-spa-accent" />
    </motion.div>
  );
};

interface HumanModelProps {
  onSelectArea: (area: string) => void;
  isFemale: boolean;
}

const HumanModel: React.FC<HumanModelProps> = ({ onSelectArea, isFemale }) => {
  return (
    <div className="relative w-full max-w-md mx-auto h-[70vh] flex flex-col items-center justify-center">
      {/* Human image */}
      <motion.div 
        className="relative w-[240px] h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full h-full">
          {/* Use the uploaded silhouette images */}
          <img
            src={isFemale ? "/lovable-uploads/da8c2dd4-4cdb-4435-a7c3-745f495f3082.png" : "/lovable-uploads/a96653e2-811d-4f6e-ba00-9fd99439c20a.png"}
            alt={isFemale ? "Female body silhouette" : "Male body silhouette"}
            className="w-full h-full object-contain"
          />

          {/* Hotspots - positioned absolutely - adjusted positions */}
          <Hotspot top="8%" left="48%" label="Face" onClick={() => onSelectArea('face')} />
          <Hotspot top="28%" left="25%" label="Arms" onClick={() => onSelectArea('arms')} />
          <Hotspot top="28%" left="70%" label="Arms" onClick={() => onSelectArea('arms')} />
          <Hotspot top="38%" left="48%" label="Abdomen" onClick={() => onSelectArea('abdomen')} />
          <Hotspot top="52%" left="32%" label="Thighs" onClick={() => onSelectArea('thighs')} />
          <Hotspot top="52%" left="62%" label="Thighs" onClick={() => onSelectArea('thighs')} />
          <Hotspot top="72%" left="33%" label="Legs" onClick={() => onSelectArea('legs')} />
          <Hotspot top="72%" left="58%" label="Legs" onClick={() => onSelectArea('legs')} />
        </div>
      </motion.div>

      {/* Switch model button */}
      <motion.button
        className="text-spa-accent hover:text-spa-dark transition-colors mt-4 text-sm"
        onClick={() => onSelectArea('switch-model')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Switch to {isFemale ? 'male' : 'female'} model
      </motion.button>
    </div>
  );
};

export default HumanModel;
