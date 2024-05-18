'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IconNames, iconMap } from '@/types/icons';
import React from 'react';

interface IconSelectorProps {
  selectedIcon: IconNames;
  onIconSelect: (icon: IconNames) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  selectedIcon,
  onIconSelect,
}) => {
  return (
    <Select
      onValueChange={(value) => onIconSelect(value as IconNames)}
      value={selectedIcon}
    >
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder="Select an icon"
          className="flex justify-center items-center"
        >
          {selectedIcon &&
            React.createElement(iconMap[selectedIcon], {
              className: 'h-5 w-5',
            })}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-full ">
        <SelectGroup>
          <SelectLabel className="px-4">Icons</SelectLabel>
          <div className="grid grid-cols-5 gap-2 p-2 ">
            {Object.entries(iconMap).map(([iconKey, IconComponent]) => (
              <SelectItem
                key={iconKey}
                value={iconKey}
                className="p-2 flex justify-center items-center"
              >
                <IconComponent className="h-5 w-5" />
              </SelectItem>
            ))}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default IconSelector;
