import React from 'react';

interface RadioOptionProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

export function RadioOption({ name, value, checked, onChange, label }: RadioOptionProps) {
  return (
    <label className="flex items-start p-4 rounded-xl glass-input cursor-pointer hover:bg-white/90 dark:hover:bg-gray-700/50 transition-colors">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1.5 mr-3 h-4 w-4 text-coral dark:text-sand focus:ring-coral/20 dark:focus:ring-sand/20"
      />
      <span className="text-gray-700 dark:text-gray-200 leading-relaxed">{label}</span>
    </label>
  );
}