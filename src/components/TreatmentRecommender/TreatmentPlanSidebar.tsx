
import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, X } from 'lucide-react';

interface TreatmentPlanItem {
  area: string;
  concernId: string;
  concernLabel: string;
}

interface TreatmentPlanSidebarProps {
  planItems: TreatmentPlanItem[];
  onRemoveItem: (area: string, concernId: string) => void;
  onClearAll: () => void;
  onFinish: () => void;
}

const TreatmentPlanSidebar: React.FC<TreatmentPlanSidebarProps> = ({
  planItems,
  onRemoveItem,
  onClearAll,
  onFinish
}) => {
  // Group items by area
  const groupedItems = planItems.reduce((acc, item) => {
    if (!acc[item.area]) {
      acc[item.area] = [];
    }
    acc[item.area].push(item);
    return acc;
  }, {} as Record<string, TreatmentPlanItem[]>);

  const formatAreaName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-display text-spa-dark">
          Your Selections ({planItems.length})
        </h3>
        {planItems.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear all selections"
          >
            <span className="flex items-center text-sm">
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </span>
          </button>
        )}
      </div>

      {planItems.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-spa-accent text-center">
            No treatments selected yet.<br />
            Click on body areas to add concerns.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {Object.entries(groupedItems).map(([area, items]) => (
            <div key={area} className="mb-6 last:mb-0">
              <h4 className="font-medium text-spa-dark border-b border-gray-100 pb-2 mb-3">
                {formatAreaName(area)}
              </h4>
              <div className="space-y-2">
                {items.map((item) => (
                  <div 
                    key={`${item.area}-${item.concernId}`}
                    className="flex items-center justify-between bg-gray-50 rounded-full py-1 px-4"
                  >
                    <span className="text-spa-dark text-sm">{item.concernLabel}</span>
                    <button
                      onClick={() => onRemoveItem(item.area, item.concernId)}
                      className="text-gray-400 hover:text-spa-accent transition-colors ml-2"
                      aria-label={`Remove ${item.concernLabel}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={onFinish}
          disabled={planItems.length === 0}
          className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-300 ${
            planItems.length === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-spa-dark text-white shadow-lg hover:shadow-xl'
          }`}
        >
          Finish Treatment Plan
        </button>
      </div>
    </motion.div>
  );
};

export default TreatmentPlanSidebar;
