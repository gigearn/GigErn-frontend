import React from "react";
import Icon from "./Icon";

const Input = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  disabled = false, 
  error = false, 
  className = "",
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-3 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
        error ? "border-destructive" : "border-border"
      } ${className}`}
      {...props}
    />
  );
};

export default Input;
