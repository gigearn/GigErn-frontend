import React from 'react';
import Icon from '../../../components/elements/Icon';

const UserTypeCard = ({ type, title, description, benefits, isSelected, onClick }) => {
  const iconMap = {
    store: 'Store',
    worker: 'Users',
    delivery: 'Truck'
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border-2 p-6 md:p-8 transition-all duration-250 ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-elevation-md'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-elevation-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg ${
          isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
        }`}>
          <Icon name={iconMap?.[type]} size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <ul className="space-y-2">
            {benefits?.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <Icon name="CheckCircle2" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserTypeCard;
