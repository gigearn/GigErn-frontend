import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';

const StoreShiftDetail = () => {
  const { shiftId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={() => navigate('/store/shifts')}
        >
          Back to Shifts
        </Button>
        <h1 className="text-2xl font-semibold text-foreground">Shift #{shiftId}</h1>
      </div>
      
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-muted-foreground">Shift details page - Coming soon</p>
      </div>
    </div>
  );
};

export default StoreShiftDetail;
