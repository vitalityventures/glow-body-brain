
/// <reference types="vite/client" />

// Extend the Window interface to include our custom BASE_PATH property
interface Window {
  BASE_PATH?: string;
  basePath?: string;
  debugLog?: (message: string, data?: any) => void;
  TreatmentRecommender?: any;
  treatmentRecommender?: any;
}
