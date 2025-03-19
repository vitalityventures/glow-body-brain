import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HumanModel from './HumanModel';
import FaceModel from './FaceModel';
import ConcernSelector from './ConcernSelector';
import ResultsForm from './ResultsForm';
import TreatmentPlanSidebar from './TreatmentPlanSidebar';
import { toast } from "sonner";
import { Drawer, DrawerContent, DrawerTrigger } from '../../components/ui/drawer';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../../components/ui/resizable';
import siteConfig from '../../config/siteConfig';
import { ShoppingBag } from 'lucide-react';

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
type Stage = 'FACE_MODEL' | 'CONCERN_SELECTOR' | 'RESULTS_FORM';

// Interface for treatment plan items
interface TreatmentPlanItem {
  area: string;
  concernId: string;
  concernLabel: string;
}

const TreatmentRecommender: React.FC = () => {
  const [stage, setStage] = useState<Stage>('FACE_MODEL');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [isFemale, setIsFemale] = useState<boolean>(true);
  const [selectedConcerns, setSelectedConcerns] = useState<{ [key: string]: string[] }>({});
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlanItem[]>([]);
  
  const handleSelectArea = (area: string) => {
    if (area === 'switch-model') {
      setIsFemale(!isFemale);
      return;
    }
    
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
    const areaData = AREA_CONCERNS[selectedArea as keyof typeof AREA_CONCERNS] || [];
    const concernItem = areaData.find(c => c.id === concernId);
    
    if (!concernItem) return;
    
    const isAlreadySelected = treatmentPlan.some(
      item => item.area === selectedArea && item.concernId === concernId
    );
    
    if (isAlreadySelected) {
      // Remove from treatment plan
      setTreatmentPlan(prev => 
        prev.filter(item => !(item.area === selectedArea && item.concernId === concernId))
      );
      
      toast.info(`Removed "${concernItem.label}" from your treatment plan`);
    } else {
      // Add to treatment plan
      setTreatmentPlan(prev => [
        ...prev,
        {
          area: selectedArea,
          concernId,
          concernLabel: concernItem.label
        }
      ]);
      
      toast.success(`Added "${concernItem.label}" to your treatment plan`);
    }
    
    // Also update the selectedConcerns state for backward compatibility
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
      // No back action needed since model is always visible
    } else if (stage === 'CONCERN_SELECTOR') {
      if (selectedArea === 'forehead' || selectedArea === 'eyes' || selectedArea === 'nose' || 
          selectedArea === 'cheeks' || selectedArea === 'mouth' || selectedArea === 'jaw' || 
          selectedArea === 'neck') {
        setStage('FACE_MODEL');
      }
    } else if (stage === 'RESULTS_FORM') {
      setStage('FACE_MODEL');
    }
  };

  const handleClearTreatmentPlan = () => {
    setTreatmentPlan([]);
    setSelectedConcerns({});
    toast.info("Treatment plan cleared");
  };

  const handleRemoveTreatmentItem = (area: string, concernId: string) => {
    setTreatmentPlan(prev => 
      prev.filter(item => !(item.area === area && item.concernId === concernId))
    );
    
    // Also update the selectedConcerns state
    setSelectedConcerns(prev => {
      const currentConcerns = prev[area] || [];
      return {
        ...prev,
        [area]: currentConcerns.filter(id => id !== concernId)
      };
    });
  };

  const handleFinishTreatment = () => {
    if (treatmentPlan.length > 0) {
      setStage('RESULTS_FORM');
    }
  };

  const handleSubmit = (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    newsletter: boolean;
  }) => {
    console.log('Submitting treatment plan:', treatmentPlan);
    console.log('Form data:', formData);
    
    toast.success(`Thank you ${formData.firstName}! Your personalized treatment plan will be emailed to you shortly.`);
  };

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const isTreatmentItemSelected = (area: string, concernId: string) => {
    return treatmentPlan.some(item => item.area === area && item.concernId === concernId);
  };

  return (
    <div className="min-h-screen bg-spa-light">
      <div className="max-w-7xl mx-auto">
        <div className="py-8 px-4 md:px-8">
          <motion.h1 
            className="text-4xl md:text-5xl text-center font-display text-spa-dark mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Your Ideal Treatment
          </motion.h1>
          
          <motion.p 
            className="text-center text-spa-accent mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {siteConfig.subtitle}
          </motion.p>

          {/* Mobile Treatment Plan Button */}
          <div className="fixed bottom-4 right-4 lg:hidden z-20">
            <Drawer>
              <DrawerTrigger asChild>
                <button 
                  className="bg-spa-dark text-white p-3 rounded-full shadow-lg flex items-center justify-center"
                  aria-label="Open treatment plan"
                >
                  <ShoppingBag className="h-6 w-6" />
                  {treatmentPlan.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                      {treatmentPlan.length}
                    </span>
                  )}
                </button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[90vh]">
                <div className="px-4 py-6 max-h-[calc(90vh-40px)] overflow-auto">
                  <TreatmentPlanSidebar
                    planItems={treatmentPlan}
                    onRemoveItem={handleRemoveTreatmentItem}
                    onClearAll={handleClearTreatmentPlan}
                    onFinish={handleFinishTreatment}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Main content with resizable panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3">
              {stage === 'RESULTS_FORM' ? (
                <motion.div
                  key="results-form"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <ResultsForm
                    treatmentPlan={treatmentPlan}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                  />
                </motion.div>
              ) : (
                <ResizablePanelGroup
                  direction="horizontal"
                  className="min-h-[70vh] border rounded-lg bg-white shadow-sm"
                >
                  {/* Left panel - Always visible human/face model */}
                  <ResizablePanel defaultSize={40} minSize={30}>
                    <div className="h-full p-4 flex flex-col justify-center items-center">
                      {selectedArea === 'face' || 
                        selectedArea === 'forehead' || 
                        selectedArea === 'eyes' || 
                        selectedArea === 'nose' || 
                        selectedArea === 'cheeks' || 
                        selectedArea === 'mouth' || 
                        selectedArea === 'jaw' || 
                        selectedArea === 'neck' ? (
                        <FaceModel onSelectArea={handleSelectFacialArea} onBack={() => handleSelectArea('body')} />
                      ) : (
                        <HumanModel onSelectArea={handleSelectArea} isFemale={isFemale} />
                      )}
                    </div>
                  </ResizablePanel>
                  
                  <ResizableHandle withHandle />
                  
                  {/* Right panel - Dynamic content (concerns) */}
                  <ResizablePanel defaultSize={60}>
                    <div className="h-full p-6 overflow-y-auto">
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
                            selectedConcerns={treatmentPlan
                              .filter(item => item.area === selectedArea)
                              .map(item => item.concernId)}
                            onSelectConcern={handleSelectConcern}
                            onBack={handleBack}
                            onContinue={handleContinue}
                          />
                        </motion.div>
                      )}
                      
                      {stage === 'FACE_MODEL' && selectedArea === 'face' && (
                        <div className="flex h-full items-center justify-center">
                          <div className="glass-panel rounded-xl px-8 py-6 text-center max-w-sm mx-auto">
                            <h3 className="text-spa-dark font-display text-xl mb-3">Select a Facial Region</h3>
                            <p className="text-spa-accent">
                              Click on specific areas of the face on the left panel to view treatment options for those regions.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {(!selectedArea || (stage === 'FACE_MODEL' && selectedArea !== 'face')) && (
                        <div className="flex h-full items-center justify-center">
                          <div className="glass-panel rounded-xl px-8 py-6 text-center max-w-sm mx-auto">
                            <h3 className="text-spa-dark font-display text-xl mb-3">Select a Body Region</h3>
                            <p className="text-spa-accent">
                              Click on specific areas of the body on the left panel to view treatment options for those regions.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              )}
            </div>

            {/* Treatment Plan Sidebar - visible on desktop */}
            <div className="hidden lg:block lg:col-span-3 mt-8">
              <TreatmentPlanSidebar
                planItems={treatmentPlan}
                onRemoveItem={handleRemoveTreatmentItem}
                onClearAll={handleClearTreatmentPlan}
                onFinish={handleFinishTreatment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentRecommender;
