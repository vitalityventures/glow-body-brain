
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import TreatmentPlanSidebar from './TreatmentPlanSidebar';
import { TreatmentPlanItem } from './types';

interface MobileTreatmentDrawerProps {
  treatmentPlan: TreatmentPlanItem[];
  onRemoveItem: (area: string, concernId: string) => void;
  onClearAll: () => void;
  onFinish: () => void;
}

const MobileTreatmentDrawer: React.FC<MobileTreatmentDrawerProps> = ({
  treatmentPlan,
  onRemoveItem,
  onClearAll,
  onFinish
}) => {
  return (
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
              onRemoveItem={onRemoveItem}
              onClearAll={onClearAll}
              onFinish={onFinish}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileTreatmentDrawer;
