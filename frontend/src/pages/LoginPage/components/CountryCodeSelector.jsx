import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/elements/Icon';

const CountryCodeSelector = ({ value, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const countryCodes = [
    { code: '+91', country: 'India', flag: 'https://flagcdn.com/w20/in.png' },
    { code: '+1', country: 'United States', flag: 'https://flagcdn.com/w20/us.png' },
    { code: '+44', country: 'United Kingdom', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: '+86', country: 'China', flag: 'https://flagcdn.com/w20/cn.png' },
    { code: '+81', country: 'Japan', flag: 'https://flagcdn.com/w20/jp.png' },
    { code: '+49', country: 'Germany', flag: 'https://flagcdn.com/w20/de.png' },
    { code: '+33', country: 'France', flag: 'https://flagcdn.com/w20/fr.png' },
    { code: '+61', country: 'Australia', flag: 'https://flagcdn.com/w20/au.png' },
    { code: '+55', country: 'Brazil', flag: 'https://flagcdn.com/w20/br.png' },
    { code: '+27', country: 'South Africa', flag: 'https://flagcdn.com/w20/za.png' },
  ];

  const filteredCodes = countryCodes?.filter(
    (item) =>
      item?.country?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.code?.includes(searchQuery)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code) => {
    onChange(code);
    setIsOpen(false);
    setSearchQuery('');
  };

  const selectedCountry = countryCodes?.find((item) => item?.code === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-3 py-2.5 md:py-3 rounded-lg border-2 border-border bg-background text-foreground transition-all duration-250 ${
          disabled
            ? 'opacity-50 cursor-not-allowed' :'hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20'
        } outline-none`}
      >
        <img 
          src={selectedCountry?.flag || 'https://flagcdn.com/w20/in.png'} 
          alt={`${selectedCountry?.country || 'India'} flag`}
          className="w-5 h-3.5 object-cover"
        />
        <span className="text-sm md:text-base font-medium whitespace-nowrap">{value}</span>
        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-muted-foreground" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 md:w-72 bg-popover border border-border rounded-lg shadow-elevation-lg z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-3 py-2 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-60">
            {filteredCodes?.length > 0 ? (
              filteredCodes?.map((item) => (
                <button
                  key={item?.code}
                  type="button"
                  onClick={() => handleSelect(item?.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-250 ${
                    value === item?.code
                      ? 'bg-primary/10 text-primary' :'text-popover-foreground hover:bg-muted'
                  }`}
                >
                  <img 
                    src={item?.flag} 
                    alt={`${item?.country} flag`}
                    className="w-5 h-3.5 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item?.country}</p>
                    <p className="text-xs text-muted-foreground">{item?.code}</p>
                  </div>
                  {value === item?.code && (
                    <Icon name="Check" size={18} color="var(--color-primary)" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelector;