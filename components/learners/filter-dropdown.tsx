import { useRef, useState, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Props {
  selected: 'role' | 'department';
  onSelect: (val: 'role' | 'department') => void;
}

export default function FilterDropdown({ selected, onSelect }: Props) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (filter: 'role' | 'department') => {
    onSelect(filter);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-64">
      <button
        onClick={() => setOpen(!open)}
        className="border border-gray-300 focus:outline-none px-4 py-2 rounded-md w-full flex items-center justify-between transition"
      >
        <span className="truncate">
          Filter: {selected === 'role' ? 'Role/Specialisation' : 'Department'}
        </span>
        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
      </button>

      {open && (
        <div className="absolute bg-white shadow-md mt-2 w-full rounded z-10">
          {['role', 'department'].map((item) => {
            const isSelected = selected === item;
            return (
              <div
                key={item}
                onClick={() => handleSelect(item as 'role' | 'department')}
                className={`flex items-center justify-between px-4 py-2 cursor-pointer ${
                  isSelected ? 'bg-leadway-orange-light' : ''
                }`}
              >
                <span className="truncate">
                  {item === 'role' ? 'Role/Specialisation' : 'Department'}
                </span>
                <div
                  className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ml-4 ${
                    isSelected ? 'border-academy-orange bg-academy-orange' : 'border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="text-white w-3 h-3" />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
