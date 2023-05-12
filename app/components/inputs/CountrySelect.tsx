"use client";
import { useCountries } from "@/app/hooks";
import React from "react";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type Props = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};

const CountrySelect = ({ value, onChange }: Props) => {
  const { getAll } = useCountries();

  const countries = getAll();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        options={countries}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-800 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3"
        }}
      />
    </div>
  );
};

export default CountrySelect;
