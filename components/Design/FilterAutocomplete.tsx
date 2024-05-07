import React, { useState } from "react";
import { Autocomplete, Button } from "@mantine/core";

interface FilterAutocompleteProps {
  url: string;
  label: string;
  name: string;
  keyName?: string;
  values: string[];
  onChange: (event: string[]) => void;
}

export default function FilterAutocomplete({
  url,
  label,
  name,
  keyName,
  values,
  onChange,
}: FilterAutocompleteProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (query: string) => {
    // Make API call to fetch autocomplete options based on query
    // Replace this with your actual API call
    const options = ["Option 1", "Option 2", "Option 3"];
    return Promise.resolve(
      options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleSelect = (value: string) => {
    onChange([...values, value]);
    setInputValue("");
  };

  return (
    <div>
      <div>{label}</div>
      <Autocomplete
        label={label}
        placeholder="Type to search..."
        value={inputValue}
        onChange={handleChange}
        multiple
        size="sm"
      />
      <Button
        onClick={() => onChange([])}
        style={{ marginTop: 10 }}
        size="xs"
        variant="light"
      >
        Clear
      </Button>
    </div>
  );
}
