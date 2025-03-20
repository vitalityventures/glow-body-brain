
import React from 'react';
import { motion } from 'framer-motion';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../ui/resizable';
import FaceModel from './FaceModel';
import HumanModel from './HumanModel';
import ConcernSelector from './ConcernSelector';
import { Stage, TreatmentPlanItem } from './types';
import { AREA_CONCERNS } from './constants/areaConcerns';

interface ModelPanelProps {
  stage: Stage;
  selectedArea: string;
  isFemale: boolean;
  treatmentPlan: TreatmentPlanItem[];
  onSelectArea: (area: string) => void;
  onSelectFacialArea: (area: string) => void;
  onSelectConcern: (concernId: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const ModelPanel: React.FC<ModelPanelProps> = ({
  stage,
  selectedArea,
  isFemale,
  treatmentPlan,
  onSelectArea,
  onSelectFacialArea,
  onSelectConcern,
  onBack,
  onContinue
}) => {
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[70vh] border rounded-lg bg-white shadow-sm"
    >
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
            <FaceModel onSelectArea={onSelectFacialArea} onBack={() => onSelectArea('body')} />
          ) : (
            <HumanModel onSelectArea={onSelectArea} isFemale={isFemale} />
          )}
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
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
                onSelectConcern={onSelectConcern}
                onBack={onBack}
                onContinue={onContinue}
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
  );
};

export default ModelPanel;
