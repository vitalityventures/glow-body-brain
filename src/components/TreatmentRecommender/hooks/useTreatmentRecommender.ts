
import { useState } from 'react';
import { toast } from "sonner";
import { Stage, TreatmentPlanItem } from '../types';
import { AREA_CONCERNS } from '../constants/areaConcerns';

export const useTreatmentRecommender = () => {
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
      // Ensure we have concerns for this area before showing concern selector
      if (AREA_CONCERNS[area as keyof typeof AREA_CONCERNS]) {
        setStage('CONCERN_SELECTOR');
      } else {
        console.warn(`No concerns found for area: ${area}`);
        toast.error(`No treatment options available for this area yet`);
      }
    }
  };

  const handleSelectFacialArea = (area: string) => {
    setSelectedArea(area);
    // Ensure we have concerns for this area
    if (AREA_CONCERNS[area as keyof typeof AREA_CONCERNS]) {
      setStage('CONCERN_SELECTOR');
    } else {
      console.warn(`No concerns found for facial area: ${area}`);
      toast.error(`No treatment options available for this area yet`);
      // Stay in face model if no concerns are found
      setStage('FACE_MODEL');
    }
  };

  const handleSelectConcern = (concernId: string) => {
    // Check if the selected area exists in AREA_CONCERNS
    if (!AREA_CONCERNS[selectedArea as keyof typeof AREA_CONCERNS]) {
      console.error(`Attempted to select concern for invalid area: ${selectedArea}`);
      return;
    }
    
    const areaData = AREA_CONCERNS[selectedArea as keyof typeof AREA_CONCERNS] || [];
    const concernItem = areaData.find(c => c.id === concernId);
    
    if (!concernItem) {
      console.error(`Concern not found: ${concernId} for area ${selectedArea}`);
      return;
    }
    
    const isAlreadySelected = treatmentPlan.some(
      item => item.area === selectedArea && item.concernId === concernId
    );
    
    if (isAlreadySelected) {
      setTreatmentPlan(prev => 
        prev.filter(item => !(item.area === selectedArea && item.concernId === concernId))
      );
      
      toast.info(`Removed "${concernItem.label}" from your treatment plan`);
    } else {
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
      // If in a facial region, go back to the main face view
      if (selectedArea !== 'face' && selectedArea !== '') {
        setSelectedArea('face');
      }
    } else if (stage === 'CONCERN_SELECTOR') {
      // If in a facial sub-area, go back to the face model
      if (selectedArea === 'forehead' || selectedArea === 'eyes' || selectedArea === 'nose' || 
          selectedArea === 'cheeks' || selectedArea === 'mouth' || selectedArea === 'jaw' || 
          selectedArea === 'neck') {
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
    setTreatmentPlan([]);
    setSelectedConcerns({});
    toast.info("Treatment plan cleared");
  };

  const handleRemoveTreatmentItem = (area: string, concernId: string) => {
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
