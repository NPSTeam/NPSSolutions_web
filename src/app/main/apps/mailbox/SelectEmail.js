import { useState } from 'react';
import MultiSelect from './MultiSelect';

const options = [
  { label: 'foo', value: 'foo' },
  { label: 'bar', value: 'bar' },
  { label: 'jar', value: 'jar' },
  { label: 'nar', value: 'nar' },
  { label: 'mar', value: 'mar' },
  { label: 'far', value: 'far' },
];
const SelectEmail = () => {
  const [value, setValue] = useState([]);

  // const getOptionDisabled = option => option.value === "foo";

  console.log(value);
  return (
    <MultiSelect
      items={options}
      // getOptionDisabled={getOptionDisabled}
      label="Select complex values"
      placeholder="Placeholder for textbox"
      selectAllLabel="Select all"
      onChange={setValue}
    />
  );
};

export default SelectEmail;
