import React, { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  label,
  options,
  className,
  required = false,
  name,
  readOnly = false,
  customClass,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();

  const filteredOptions = options
    ? options
        .filter((option) => {
          const label = option.label || "";
          return label.toLowerCase().startsWith(searchTerm.toLowerCase());
        })
        .sort((a, b) => (a.label || "").localeCompare(b.label || ""))
    : [];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleOptionSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setSearchTerm(
      options.find((opt) => opt.value === optionValue)?.label || ""
    );
    setIsDropdownOpen(false);
  };

  if (type === "searchable-select") {
    return (
      <div className={className}>
        <label className="block text-[11px] text-neutral-100/50">{label}</label>
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-[6px] border-2 border-white bg-transparent text-xs text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required={required}
            name={name}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            readOnly={readOnly}
          />
          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-[250px] overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.slice(0, 5).map((option) => (
                  <div
                    key={option.value}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                    onClick={() => handleOptionSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No matching options found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className={className}>
        <label className="block text-[11px] text-neutral-100/50">{label}</label>
        <select
          className="w-full px-4 py-[6px] border-2 border-white bg-transparent text-xs text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={value}
          onChange={onChange}
          required={required}
          name={name}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "file") {
    return (
      <div className={className}>
        <label className="block text-[11px] text-neutral-100/50">{label}</label>
        <input
          type="file"
          className="w-full px-4 py-[6px] border-2 border-white bg-transparent text-xs text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onChange={onChange}
          required={required}
          name={name}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <label className="block text-[11px] text-neutral-100/50">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-[6px] border-2 border-white bg-transparent text-xs text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500${customClass} `}
        required={required}
        name={name}
        readOnly={readOnly}
      />
    </div>
  );
};

export default Input;
