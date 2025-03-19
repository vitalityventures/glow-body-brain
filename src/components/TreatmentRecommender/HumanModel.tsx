
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
        className="relative w-[240px] h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {isFemale ? (
          // Female silhouette - filled version
          <svg 
            viewBox="0 0 240 500" 
            className="w-full h-full"
          >
            <path 
              d="M120,40 C135,40 147,50 150,65 C152,75 152,80 150,90
                 L148,100 C146,110 145,120 145,130
                 L145,150 C145,155 145,160 145,165
                 C167,170 180,180 187,200
                 C195,220 197,240 195,260
                 C193,280 190,300 183,320
                 L176,340 C172,350 170,360 168,370
                 L166,380 C164,390 162,400 160,410
                 L158,420 C156,430 154,440 150,450
                 L150,480 L140,480 L140,450
                 C137,442 134,434 132,426
                 L131,420 C128,410 126,400 124,390
                 L122,380 C120,370 118,360 115,350
                 L112,340 C108,330 105,320 100,310
                 C95,300 93,290 90,280
                 C87,270 85,260 83,250
                 C81,240 80,230 80,220
                 C80,210 80,200 82,190
                 C84,180 88,170 92,160
                 L95,150 C95,145 95,140 95,135
                 L95,130 C95,120 94,110 92,100
                 L90,90 C88,80 88,75 90,65
                 C93,50 105,40 120,40 Z"
              fill="#F5D0B1"
              stroke="#888"
              strokeWidth="1"
            />
            {/* Add hair to female silhouette */}
            <path 
              d="M120,40 C110,40 100,35 95,25
                 C90,15 88,5 90,0
                 L150,0 C152,5 150,15 145,25
                 C140,35 130,40 120,40 Z"
              fill="#8B4513"
              stroke="#888"
              strokeWidth="1"
            />
          </svg>
        ) : (
          // Male silhouette - filled version
          <svg 
            viewBox="0 0 240 500" 
            className="w-full h-full"
          >
            <path 
              d="M120,40 C135,40 147,50 150,65 C152,75 152,80 150,90
                 L148,100 C146,110 145,120 145,130
                 L145,150 C145,155 145,160 145,165
                 C170,170 185,180 192,200
                 C200,220 202,240 200,260
                 C198,280 195,300 188,320
                 L181,340 C177,350 175,360 173,370
                 L171,380 C169,390 167,400 165,410
                 L163,420 C161,430 159,440 155,450
                 L155,480 L135,480 L135,450
                 C132,442 129,434 127,426
                 L126,420 C123,410 121,400 119,390
                 L117,380 C115,370 113,360 110,350
                 L107,340 C103,330 100,320 95,310
                 C90,300 87,290 85,280
                 C82,270 80,260 78,250
                 C76,240 75,230 75,220
                 C75,210 75,200 77,190
                 C79,180 85,170 90,160
                 L95,150 C95,145 95,140 95,135
                 L95,130 C95,120 94,110 92,100
                 L90,90 C88,80 88,75 90,65
                 C93,50 105,40 120,40 Z"
              fill="#F5D0B1"
              stroke="#888"
              strokeWidth="1"
            />
            {/* Very short hair for male */}
            <path 
              d="M120,40 C110,40 100,36 95,30
                 C90,24 88,18 90,15
                 L150,15 C152,18 150,24 145,30
                 C140,36 130,40 120,40 Z"
              fill="#5A3825"
              stroke="#888"
              strokeWidth="1"
            />
          </svg>
        )}

        {/* Hotspots - positioned absolutely */}
        <Hotspot top="8%" left="50%" label="Face" onClick={() => onSelectArea('face')} />
        <Hotspot top="32%" left="25%" label="Arms" onClick={() => onSelectArea('arms')} />
        <Hotspot top="32%" left="75%" label="Arms" onClick={() => onSelectArea('arms')} />
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
