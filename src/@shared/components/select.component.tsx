import { FormControl, InputLabel, NativeSelect } from '@mui/material';

export function SelectComponent({
  label,
  options,
  onHandleOptionChange,
}: {
  label: string;
  options: { value: string | number; label: string }[];
  onHandleOptionChange: (value: string) => void;
}) {
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {label}
      </InputLabel>
      <NativeSelect
        defaultValue={30}
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
