
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ResultsForm from './ResultsForm';
import TreatmentPlanSidebar from './TreatmentPlanSidebar';
import MobileTreatmentDrawer from './MobileTreatmentDrawer';
import ModelPanel from './ModelPanel';
import { useTreatmentRecommender } from './hooks/useTreatmentRecommender';
import { getSiteConfig } from '../../exports/TreatmentRecommenderExport';

const TreatmentRecommender: React.FC = () => {
  const {
    stage,
    selectedArea,
    isFemale,
    treatmentPlan,
    handleSelectArea,
    handleSelectFacialArea,
    handleSelectConcern,
    handleContinue,
    handleBack,
    handleClearTreatmentPlan,
    handleRemoveTreatmentItem,
    handleFinishTreatment,
    handleSubmit
  } = useTreatmentRecommender();

  const siteConfig = getSiteConfig();

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
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

          <MobileTreatmentDrawer 
            treatmentPlan={treatmentPlan}
            onRemoveItem={handleRemoveTreatmentItem}
            onClearAll={handleClearTreatmentPlan}
            onFinish={handleFinishTreatment}
          />

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
                <ModelPanel
                  stage={stage}
                  selectedArea={selectedArea}
                  isFemale={isFemale}
                  treatmentPlan={treatmentPlan}
                  onSelectArea={handleSelectArea}
                  onSelectFacialArea={handleSelectFacialArea}
                  onSelectConcern={handleSelectConcern}
                  onBack={handleBack}
                  onContinue={handleContinue}
                />
              )}
            </div>

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
