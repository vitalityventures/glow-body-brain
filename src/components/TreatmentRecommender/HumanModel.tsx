
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
          className="w-full h-full stroke-spa-dark fill-none stroke-[1]"
        >
          {isFemale ? (
            // Female silhouette with more realistic body shape
            <>
              {/* Head */}
              <ellipse cx="150" cy="70" rx="35" ry="40" />
              
              {/* Neck */}
              <path d="M140,105 L140,120 M160,105 L160,120" />
              
              {/* Body outline */}
              <path d="M110,120 C100,150 100,200 95,240 C90,280 95,330 105,380 L110,420 L110,450 L140,450 L140,420 M190,120 C200,150 200,200 205,240 C210,280 205,330 195,380 L190,420 L190,450 L160,450 L160,420" />
              
              {/* Shoulders */}
              <path d="M110,130 C100,135 90,140 70,145 M190,130 C200,135 210,140 230,145" />
              
              {/* Arms */}
              <path d="M70,145 C60,180 60,220 65,260 M230,145 C240,180 240,220 235,260" />
              
              {/* Chest */}
              <path d="M110,160 C120,165 140,170 150,170 C160,170 180,165 190,160" />
              
              {/* Waist */}
              <path d="M100,240 C120,250 140,255 150,255 C160,255 180,250 200,240" />
              
              {/* Hips */}
              <path d="M105,300 C120,310 140,315 150,315 C160,315 180,310 195,300" />
              
              {/* Legs connection */}
              <path d="M140,420 C145,420 155,420 160,420" />
            </>
          ) : (
            // Male silhouette with more realistic body shape
            <>
              {/* Head */}
              <ellipse cx="150" cy="70" rx="38" ry="40" />
              
              {/* Neck */}
              <path d="M140,105 L140,120 M160,105 L160,120" />
              
              {/* Body outline */}
              <path d="M110,120 C95,150 95,200 90,240 C85,280 90,330 100,380 L105,420 L105,450 L135,450 L135,420 M190,120 C205,150 205,200 210,240 C215,280 210,330 200,380 L195,420 L195,450 L165,450 L165,420" />
              
              {/* Shoulders - wider than female */}
              <path d="M110,130 C95,135 80,140 60,145 M190,130 C205,135 220,140 240,145" />
              
              {/* Arms */}
              <path d="M60,145 C50,180 50,220 55,260 M240,145 C250,180 250,220 245,260" />
              
              {/* Chest - broader than female */}
              <path d="M110,160 C125,165 140,167 150,167 C160,167 175,165 190,160" />
              
              {/* Waist - straighter than female */}
              <path d="M95,240 C115,247 135,250 150,250 C165,250 185,247 205,240" />
              
              {/* Hips - straighter than female */}
              <path d="M100,300 C120,305 135,307 150,307 C165,307 180,305 200,300" />
              
              {/* Legs connection */}
              <path d="M135,420 C142,420 158,420 165,420" />
            </>
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
