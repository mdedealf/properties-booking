"use client";

import useCountries, { Country } from "@/hooks/useCountries";
import Select from "react-select";

interface CountrySelectProps {
  value: Country | null;
  onChange: (value: Country | null) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAllCountries } = useCountries();

  return (
    <Select<Country>
      placeholder="Search for a country"
      isClearable
      options={getAllCountries()}
      value={value}
      onChange={onChange}
      formatOptionLabel={(option) => (
        <div className="flex items-center py-2 z-100">
          <span className="text-gray-600 font-semibold">{option.label}</span>
          <span className="ml-2 text-gray-400 text-sm">{option.region}</span>
        </div>
      )}
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 12,
        colors: {
          ...theme.colors,
          primary: "#ffe4e6",
          primary25: "#ffe4e6",
        },
      })}
    />
  );
};

export default CountrySelect;
