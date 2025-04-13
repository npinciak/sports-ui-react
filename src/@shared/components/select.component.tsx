import { FormControl, InputLabel, NativeSelect } from '@mui/material';

interface SelectComponentProps {
  label?: string;
  options: { value: string | number; label: string }[];
  defaultValue?: string | number;
  onHandleOptionChange: (value: string) => void;
}

export function SelectComponent({
  label,
  options,
  defaultValue,
  onHandleOptionChange,
}: SelectComponentProps) {
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {label}
      </InputLabel>
      <NativeSelect
        defaultValue={defaultValue}
        inputProps={{
          name: label,
          id: 'uncontrolled-native',
        }}
        onChange={e => onHandleOptionChange(e.target.value)}
      >
        {options.map(item => (
          <option key={item!.value} value={item!.value}>
            {item!.label}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
