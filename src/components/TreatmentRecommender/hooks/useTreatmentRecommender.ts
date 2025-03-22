
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Stage, TreatmentPlanItem } from '../types';
import { AREA_CONCERNS } from '../constants/areaConcerns';

export const useTreatmentRecommender = () => {
  const [stage, setStage] = useState<Stage>('FACE_MODEL');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [isFemale, setIsFemale] = useState<boolean>(true);
  const [selectedConcerns, setSelectedConcerns] = useState<{ [key: string]: string[] }>({});
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlanItem[]>([]);
  
  // Debug the current state
  useEffect(() => {
    console.log("Treatment recommender state:", { 
      stage, 
      selectedArea, 
      treatmentPlan,
      selectedConcerns 
    });
  }, [stage, selectedArea, treatmentPlan, selectedConcerns]);

  const handleSelectArea = (area: string) => {
    if (area === 'switch-model') {
      setIsFemale(!isFemale);
      return;
    }
    
    console.log(`Selected area: ${area}`);
    setSelectedArea(area);
    
    if (area === 'face') {
      setStage('FACE_MODEL');
    } else {
      // Ensure we have concerns for this area before showing concern selector
      const areaConcerns = AREA_CONCERNS[area as keyof typeof AREA_CONCERNS];
      if (areaConcerns && areaConcerns.length > 0) {
        console.log(`Found ${areaConcerns.length} concerns for area: ${area}`);
        setStage('CONCERN_SELECTOR');
      } else {
        console.warn(`No concerns found for area: ${area}`);
        toast.error(`No treatment options available for this area yet`);
        // Stay in face model if no concerns are found
        setStage('FACE_MODEL');
      }
    }
  };

  const handleSelectFacialArea = (area: string) => {
    console.log(`Selected facial area: ${area}`);
    setSelectedArea(area);
    
    // Ensure we have concerns for this area
    const areaConcerns = AREA_CONCERNS[area as keyof typeof AREA_CONCERNS];
    if (areaConcerns && areaConcerns.length > 0) {
      console.log(`Found ${areaConcerns.length} concerns for facial area: ${area}`);
      setStage('CONCERN_SELECTOR');
    } else {
      console.warn(`No concerns found for facial area: ${area}`);
      toast.error(`No treatment options available for this facial area yet`);
      // Stay in face model if no concerns are found
      setStage('FACE_MODEL');
    }
  };

  const handleSelectConcern = (concernId: string) => {
    console.log(`Selecting concern: ${concernId} for area: ${selectedArea}`);
    
    // Check if the selected area exists in AREA_CONCERNS
    if (!AREA_CONCERNS[selectedArea as keyof typeof AREA_CONCERNS]) {
      console.error(`Attempted to select concern for invalid area: ${selectedArea}`);
      toast.error("Unable to select concern: area not found");
      return;
    }
    
    const areaData = AREA_CONCERNS[selectedArea as keyof typeof AREA_CONCERNS] || [];
    const concernItem = areaData.find(c => c.id === concernId);
    
    if (!concernItem) {
      console.error(`Concern not found: ${concernId} for area ${selectedArea}`);
      toast.error("Unable to select concern: concern not found");
      return;
    }
    
    const isAlreadySelected = treatmentPlan.some(
      item => item.area === selectedArea && item.concernId === concernId
    );
    
    if (isAlreadySelected) {
      console.log(`Removing concern ${concernId} from treatment plan`);
      setTreatmentPlan(prev => 
        prev.filter(item => !(item.area === selectedArea && item.concernId === concernId))
      );
      
      toast.info(`Removed "${concernItem.label}" from your treatment plan`);
    } else {
      console.log(`Adding concern ${concernId} to treatment plan`);
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
    
    // Update selected concerns
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
    console.log(`Continue from stage: ${stage}`);
    if (stage === 'CONCERN_SELECTOR') {
      setStage('RESULTS_FORM');
    }
  };

  const handleBack = () => {
    console.log(`Back from stage: ${stage}, area: ${selectedArea}`);
    
    if (stage === 'FACE_MODEL') {
      // If in a facial region, go back to the main face view
      if (selectedArea !== 'face' && selectedArea !== '') {
        setSelectedArea('face');
      }
    } else if (stage === 'CONCERN_SELECTOR') {
      // If in a facial sub-area, go back to the face model
      const facialAreas = ['forehead', 'eyes', 'nose', 'cheeks', 'mouth', 'jaw', 'neck'];
      if (facialAreas.includes(selectedArea)) {
        setSelectedArea('face');
        setStage('FACE_MODEL');
      } else {
        // For body areas, go back to body selection
        setSelectedArea('');
        setStage('FACE_MODEL');
      }
    } else if (stage === 'RESULTS_FORM') {
      // Go back to body selection from results form
      setSelectedArea('');
      setStage('FACE_MODEL');
    }
  };

  const handleClearTreatmentPlan = () => {
    console.log("Clearing treatment plan");
    setTreatmentPlan([]);
    setSelectedConcerns({});
    toast.info("Treatment plan cleared");
  };

  const handleRemoveTreatmentItem = (area: string, concernId: string) => {
    console.log(`Removing treatment item: ${concernId} from area: ${area}`);
    setTreatmentPlan(prev => 
      prev.filter(item => !(item.area === area && item.concernId === concernId))
    );
    
    setSelectedConcerns(prev => {
      const currentConcerns = prev[area] || [];
      return {
        ...prev,
        [area]: currentConcerns.filter(id => id !== concernId)
      };
    });
    
    toast.info("Item removed from treatment plan");
  };

  const handleFinishTreatment = () => {
    console.log("Finishing treatment plan");
    if (treatmentPlan.length > 0) {
      setStage('RESULTS_FORM');
    } else {
      toast.warning("Please select at least one concern before continuing");
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

  return {
    stage,
    selectedArea,
    isFemale,
    selectedConcerns,
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
  };
};
