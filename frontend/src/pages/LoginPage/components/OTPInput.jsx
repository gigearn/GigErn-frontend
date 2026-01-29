import React, { useRef, useEffect } from 'react';

const OTPInput = ({ length = 6, value, onChange, disabled = false, error = false }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs?.current?.[0]) {
      inputRefs?.current?.[0]?.focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const val = e?.target?.value;
    if (!/^\d*$/?.test(val)) return;

    const newOTP = value?.split('');
    newOTP[index] = val?.slice(-1);
    onChange(newOTP?.join(''));

    if (val && index < length - 1) {
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !value?.[index] && index > 0) {
      inputRefs?.current?.[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    const pastedData = e?.clipboardData?.getData('text')?.slice(0, length);
    if (!/^\d+$/?.test(pastedData)) return;

    onChange(pastedData?.padEnd(length, ''));
    const nextIndex = Math.min(pastedData?.length, length - 1);
    inputRefs?.current?.[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-2 md:gap-3 justify-center">
      {Array.from({ length })?.map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value?.[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`w-10 h-12 md:w-12 md:h-14 lg:w-14 lg:h-16 text-center text-lg md:text-xl lg:text-2xl font-semibold rounded-lg border-2 transition-all duration-250 ${
            error
              ? 'border-error bg-error/5 text-error'
              : value?.[index]
              ? 'border-primary bg-primary/5 text-foreground'
              : 'border-border bg-background text-foreground hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'} outline-none`}
        />
      ))}
    </div>
  );
};

export default OTPInput;