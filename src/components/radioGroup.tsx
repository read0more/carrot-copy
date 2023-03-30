import React from 'react';

interface RadioGroupProps {
  values: string[];
  commonInputProps: React.InputHTMLAttributes<HTMLInputElement>;
  groupProps?: React.HTMLAttributes<HTMLDivElement>;
}

export default function RadioGroup({
  values,
  commonInputProps,
  groupProps,
}: RadioGroupProps) {
  return (
    <div {...groupProps}>
      {values.map((value) => (
        <label className="block font-medium" key={value}>
          <input
            {...commonInputProps}
            type="radio"
            value={value}
            className="mr-1"
          />
          {value}
        </label>
      ))}
    </div>
  );
}
