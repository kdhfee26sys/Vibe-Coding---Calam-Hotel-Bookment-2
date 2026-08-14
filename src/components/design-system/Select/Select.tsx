import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './Select.module.css';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[] | string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ options, value, onChange, placeholder, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to an array of objects
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedLabel = normalizedOptions.find(opt => opt.value === value)?.label || placeholder || value;

  return (
    <div className={`${styles.container} ${className || ''}`} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedLabel} <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {normalizedOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`${styles.item} ${value === opt.value ? styles.itemActive : ''}`}
              onClick={() => handleSelect(opt.value)}
              role="option"
              aria-selected={value === opt.value}
            >
              {opt.label}
              {value === opt.value && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
