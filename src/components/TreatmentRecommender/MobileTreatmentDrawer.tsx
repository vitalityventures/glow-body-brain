
import React, { useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 lg:hidden z-20">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
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
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[90vh] rounded-t-xl">
          <div className="px-4 py-6 max-h-[calc(90vh-40px)] overflow-auto">
            <TreatmentPlanSidebar
              planItems={treatmentPlan}
              onRemoveItem={onRemoveItem}
              onClearAll={onClearAll}
              onFinish={onFinish}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileTreatmentDrawer;
