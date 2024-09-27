"use client";

import { useTheme } from "next-themes";
import { useMemo, useCallback } from "react";
import { MultiValue } from "react-select";
import CreateableSelect from "react-select/creatable";
import { Button } from "./button";

type Props = {
  onChange: (value?: string[]) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string[] | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

export const DynamicSelect = ({
  value = [],
  onChange,
  disabled,
  onCreate,
  options = [],
  placeholder,
}: Props) => {
  const onSelect = (options: MultiValue<{ label: string; value: string }>) => {
    onChange(options.map((option) => option.value));
  };

  const formattedValue = useMemo(() => {
    return options.filter((option) => value?.includes(option.value));
  }, [options, value]);

  const handleCreate = (inputValue: string) => {
    if (onCreate) {
      onCreate(inputValue);
    }
  };

  const selectAll = useCallback(() => {
    // Select all available options
    onChange(options.map((option) => option.value));
  }, [options, onChange]);

  const { theme } = useTheme();

  return (
    <div className="flex items-start gap-2">
      <CreateableSelect
        isMulti
        placeholder={placeholder}
        className="text-sm bg-neutral-900 w-full"
        styles={{
          control: (base) => ({
            ...base,
            borderColor: theme === "dark" ? "#444" : "#e2e8f0", // Darker border for dark theme
            backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff", // Dark background
            color: theme === "dark" ? "#fff" : "#000", // Text color
            ":hover": { borderColor: theme === "dark" ? "#666" : "#e2e8f0" }, // Hover border
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#333" : "#e2e8f0", // Multi-value background
            color: theme === "dark" ? "#fff" : "#000", // Multi-value text color
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: theme === "dark" ? "#fff" : "#000", // Multi-value label text color
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: theme === "dark" ? "#fff" : "#000", // Multi-value remove icon color
            ":hover": {
              backgroundColor: theme === "dark" ? "#f00" : "#f7fafc", // Remove icon hover color
              color: "#fff",
            },
          }),
          option: (base) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff", // Option background
            color: theme === "dark" ? "#fff" : "#000", // Option text color
            ":hover": { backgroundColor: theme === "dark" ? "#333" : "#f7fafc" }, // Option hover color
          }),
        }}
        value={formattedValue}
        onChange={onSelect}
        options={options}
        onCreateOption={handleCreate}
        isDisabled={disabled}
      />
      <Button
        type="button"
        onClick={selectAll}
        disabled={disabled || options.length === 0}
        variant="secondary"
      >
        Select All
      </Button>
    </div>
  );
};
