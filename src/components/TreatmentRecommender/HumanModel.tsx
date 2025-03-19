
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto h-[70vh] flex flex-col items-center justify-center">
      {/* Human image */}
      <motion.div 
        className="relative w-[240px] h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full">
          {/* Use the uploaded silhouette images */}
          <img
            src={isFemale ? "/lovable-uploads/da8c2dd4-4cdb-4435-a7c3-745f495f3082.png" : "/lovable-uploads/a96653e2-811d-4f6e-ba00-9fd99439c20a.png"}
            alt={isFemale ? "Female body silhouette" : "Male body silhouette"}
            className="w-full h-full object-contain"
          />

          {/* Hotspots - positioned absolutely - adjusted positions */}
          <Hotspot top="10%" left="48%" label="Face" onClick={() => onSelectArea('face')} />
          <Hotspot top="28%" left="25%" label="Arms" onClick={() => onSelectArea('arms')} />
          <Hotspot top="28%" left="70%" label="Arms" onClick={() => onSelectArea('arms')} />
          <Hotspot top="38%" left="48%" label="Abdomen" onClick={() => onSelectArea('abdomen')} />
          <Hotspot top="52%" left="32%" label="Thighs" onClick={() => onSelectArea('thighs')} />
          <Hotspot top="52%" left="62%" label="Thighs" onClick={() => onSelectArea('thighs')} />
          <Hotspot top="72%" left="35%" label="Legs" onClick={() => onSelectArea('legs')} />
          <Hotspot top="72%" left="60%" label="Legs" onClick={() => onSelectArea('legs')} />
        </div>
      </motion.div>

      {/* Instruction text below the graphic */}
      <motion.div 
        className="mt-6 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="glass-panel rounded-xl px-8 py-4 text-center max-w-xs mx-auto">
          <h3 className="text-spa-dark font-display text-lg mb-1">Click on an area</h3>
          <p className="text-spa-accent text-sm">Select a body region to view treatment options</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HumanModel;
