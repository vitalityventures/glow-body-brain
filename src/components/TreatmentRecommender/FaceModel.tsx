
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
          className="w-full h-full stroke-spa-dark fill-none stroke-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Face outline with more realistic features */}
          <ellipse cx="150" cy="150" rx="90" ry="110" />
          
          {/* Hairline suggestion */}
          <path d="M75,110 C90,70 120,40 150,40 C180,40 210,70 225,110" />
          
          {/* Ears */}
          <path d="M60,150 C55,160 55,170 60,180 M240,150 C245,160 245,170 240,180" />
          
          {/* Eyes with more realistic shape */}
          <ellipse cx="115" cy="135" rx="15" ry="7" />
          <ellipse cx="185" cy="135" rx="15" ry="7" />
          
          {/* Eyebrows */}
          <path d="M95,120 C105,115 125,115 135,122 M165,122 C175,115 195,115 205,120" />
          
          {/* Nose with more detailed structure */}
          <path d="M150,135 C150,155 145,175 140,185 M150,135 C150,155 155,175 160,185" />
          <path d="M135,185 C145,190 155,190 165,185" />
          
          {/* Mouth with fuller lips */}
          <path d="M125,220 C135,227 165,227 175,220" />
          <path d="M125,220 C135,215 165,215 175,220" />
          
          {/* Cheeks contour */}
          <path d="M90,170 C105,190 120,195 130,195 M210,170 C195,190 180,195 170,195" />
          
          {/* Jawline and chin definition */}
          <path d="M75,170 C85,220 110,260 150,270 C190,260 215,220 225,170" />
          
          {/* Neck suggestion */}
          <path d="M115,270 C120,290 130,300 150,310 C170,300 180,290 185,270" />
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
        <Hotspot top="75%" left="85%" label="Neck" onClick={() => onSelectArea('neck')} />
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
