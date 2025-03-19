import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HumanModel from './HumanModel';
import FaceModel from './FaceModel';
import ConcernSelector from './ConcernSelector';
import ResultsForm from './ResultsForm';
import { toast } from "sonner";

// Treatment area concerns data
const AREA_CONCERNS = {
  face: [
    { id: 'wrinkles', label: 'Wrinkles & Fine Lines' },
    { id: 'uneven-tone', label: 'Uneven Skin Tone' },
    { id: 'acne', label: 'Acne & Blemishes' },
    { id: 'sagging', label: 'Skin Laxity & Sagging' },
    { id: 'dark-circles', label: 'Dark Circles' },
    { id: 'rosacea', label: 'Rosacea & Redness' },
    { id: 'volume-loss', label: 'Volume Loss' },
    { id: 'sunspots', label: 'Sun Damage & Age Spots' },
  ],
  forehead: [
    { id: 'forehead-lines', label: 'Forehead Lines' },
    { id: 'frown-lines', label: 'Frown Lines' },
    { id: 'sunspots', label: 'Sun Damage & Age Spots' },
  ],
  eyes: [
    { id: 'crow-feet', label: 'Crow\'s Feet' },
    { id: 'dark-circles', label: 'Dark Circles' },
    { id: 'eye-bags', label: 'Eye Bags & Puffiness' },
    { id: 'hollowing', label: 'Hollowing Under Eyes' },
    { id: 'droopy-eyelids', label: 'Droopy Eyelids' },
  ],
  nose: [
    { id: 'nasal-shape', label: 'Nasal Shape Concerns' },
    { id: 'nostril-size', label: 'Nostril Size' },
    { id: 'nose-bump', label: 'Bump on Nose Bridge' },
    { id: 'nasal-asymmetry', label: 'Asymmetry' },
  ],
  cheeks: [
    { id: 'volume-loss', label: 'Volume Loss' },
    { id: 'nasolabial-folds', label: 'Nasolabial Folds' },
    { id: 'acne-scars', label: 'Acne Scars' },
    { id: 'uneven-texture', label: 'Uneven Texture' },
    { id: 'sagging', label: 'Sagging Cheeks' },
  ],
  mouth: [
    { id: 'thin-lips', label: 'Thin Lips' },
    { id: 'lip-lines', label: 'Lip Lines' },
    { id: 'lip-asymmetry', label: 'Lip Asymmetry' },
    { id: 'marionette-lines', label: 'Marionette Lines' },
  ],
  jaw: [
    { id: 'jawline-definition', label: 'Lack of Jawline Definition' },
    { id: 'double-chin', label: 'Double Chin' },
    { id: 'jowls', label: 'Jowls' },
    { id: 'chin-projection', label: 'Chin Projection' },
  ],
  neck: [
    { id: 'tech-neck', label: 'Tech Neck Lines' },
    { id: 'neck-laxity', label: 'Neck Laxity' },
    { id: 'neck-bands', label: 'Platysmal Bands' },
    { id: 'neck-fat', label: 'Submental Fat' },
  ],
  arms: [
    { id: 'arm-fat', label: 'Excess Fat' },
    { id: 'arm-skin-laxity', label: 'Skin Laxity' },
    { id: 'stretch-marks', label: 'Stretch Marks' },
    { id: 'cellulite', label: 'Cellulite' },
  ],
  abdomen: [
    { id: 'belly-fat', label: 'Excess Fat' },
    { id: 'loose-skin', label: 'Loose Skin' },
    { id: 'stretch-marks', label: 'Stretch Marks' },
    { id: 'diastasis', label: 'Diastasis Recti' },
    { id: 'muffin-top', label: 'Muffin Top / Love Handles' },
  ],
  thighs: [
    { id: 'thigh-fat', label: 'Excess Fat' },
    { id: 'cellulite', label: 'Cellulite' },
    { id: 'thigh-skin-laxity', label: 'Skin Laxity' },
    { id: 'stretch-marks', label: 'Stretch Marks' },
  ],
  legs: [
    { id: 'leg-fat', label: 'Excess Fat' },
    { id: 'leg-cellulite', label: 'Cellulite' },
    { id: 'varicose-veins', label: 'Varicose & Spider Veins' },
    { id: 'leg-hair', label: 'Unwanted Hair' },
  ],
};

// Stages of the treatment recommender flow
type Stage = 'HUMAN_MODEL' | 'FACE_MODEL' | 'CONCERN_SELECTOR' | 'RESULTS_FORM';

const TreatmentRecommender: React.FC = () => {
  const [stage, setStage] = useState<Stage>('HUMAN_MODEL');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [isFemale, setIsFemale] = useState<boolean>(true);
  const [selectedConcerns, setSelectedConcerns] = useState<{ [key: string]: string[] }>({});
  
  const handleSelectArea = (area: string) => {
    setSelectedArea(area);
    if (area === 'face') {
      setStage('FACE_MODEL');
    } else {
      setStage('CONCERN_SELECTOR');
    }
  };

  const handleSelectFacialArea = (area: string) => {
    setSelectedArea(area);
    setStage('CONCERN_SELECTOR');
  };

  const handleSelectConcern = (concernId: string) => {
    setSelectedConcerns(prev => {
      const currentConcerns = prev[selectedArea] || [];
      if (currentConcerns.includes(concernId)) {
        return {
          ...prev,
          [selectedArea]: currentConcerns.filter(id => id !== concernId)
        };
      } else {
        return {
          ...prev,
          [selectedArea]: [...currentConcerns, concernId]
        };
      }
    });
  };

  const handleContinue = () => {
    if (stage === 'CONCERN_SELECTOR') {
      setStage('RESULTS_FORM');
    }
  };

  const handleBack = () => {
    if (stage === 'FACE_MODEL') {
      setStage('HUMAN_MODEL');
    } else if (stage === 'CONCERN_SELECTOR') {
      if (selectedArea === 'forehead' || selectedArea === 'eyes' || selectedArea === 'nose' || 
          selectedArea === 'cheeks' || selectedArea === 'mouth' || selectedArea === 'jaw' || 
          selectedArea === 'neck') {
        setStage('FACE_MODEL');
      } else {
        setStage('HUMAN_MODEL');
      }
    } else if (stage === 'RESULTS_FORM') {
      setStage('CONCERN_SELECTOR');
    }
  };

  const handleSubmit = (email: string, name: string) => {
    console.log('Submitting with email:', email);
    console.log('Name:', name);
    console.log('Selected concerns:', selectedConcerns);
    
    toast.success("Thank you! Your treatment plan will be emailed to you shortly.");
  };

  // Transform selectedConcerns object into array format for ResultsForm
  const getConcernsArray = () => {
    return Object.entries(selectedConcerns)
      .filter(([_, concerns]) => concerns.length > 0)
      .map(([area, concernIds]) => {
        // Map concern IDs to their labels
        const concernLabels = concernIds.map(id => {
          const areaData = AREA_CONCERNS[area as keyof typeof AREA_CONCERNS] || [];
          const concern = areaData.find(c => c.id === id);
          return concern ? concern.label : id;
        });
        
        return {
          area,
          concerns: concernLabels
        };
      });
  };

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className="min-h-screen bg-spa-light">
      <div className="max-w-6xl mx-auto">
        <div className="py-8 px-4 md:px-8">
          <motion.h1 
            className="text-4xl md:text-5xl text-center font-display text-spa-dark mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Treatment Recommender
          </motion.h1>
          
          <motion.p 
            className="text-center text-spa-accent mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Discover personalized aesthetic treatments tailored to your unique concerns
          </motion.p>

          <AnimatePresence mode="wait">
            {stage === 'HUMAN_MODEL' && (
              <motion.div
                key="human-model"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <HumanModel onSelectArea={handleSelectArea} isFemale={isFemale} />
                  
                  <motion.button
                    className="text-spa-accent hover:text-spa-dark transition-colors mt-4 text-sm"
                    onClick={() => setIsFemale(!isFemale)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Switch to {isFemale ? 'male' : 'female'} model
                  </motion.button>
                </div>
              </motion.div>
            )}

            {stage === 'FACE_MODEL' && (
              <motion.div
                key="face-model"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <FaceModel onSelectArea={handleSelectFacialArea} onBack={handleBack} />
              </motion.div>
            )}

            {stage === 'CONCERN_SELECTOR' && (
              <motion.div
                key="concern-selector"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <ConcernSelector
                  area={selectedArea}
                  concerns={AREA_CONCERNS[selectedArea as keyof typeof AREA_CONCERNS] || []}
                  selectedConcerns={selectedConcerns[selectedArea] || []}
                  onSelectConcern={handleSelectConcern}
                  onBack={handleBack}
                  onContinue={handleContinue}
                />
              </motion.div>
            )}

            {stage === 'RESULTS_FORM' && (
              <motion.div
                key="results-form"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <ResultsForm
                  selectedConcerns={getConcernsArray()}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TreatmentRecommender;
