
// Stages of the treatment recommender flow
export type Stage = 'FACE_MODEL' | 'CONCERN_SELECTOR' | 'RESULTS_FORM';

// Interface for treatment plan items
export interface TreatmentPlanItem {
  area: string;
  concernId: string;
  concernLabel: string;
}

export interface ConcernOption {
  id: string;
  label: string;
}
