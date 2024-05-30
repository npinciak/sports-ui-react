export function SelectComponent({
  label,
  options,
  onHandleOptionChange,
}: {
  label: string;
  options: { value: string | number; label: string }[];
  onHandleOptionChange: (value: string) => void;
}) {
  const labelAttribute = `${label.split(' ').join('').toLowerCase()}Select`;

  return (
    <div className="mb-3 w-full">
      <label
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={labelAttribute}
      >
        {label}
      </label>
      <select
        className="form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 hover:cursor-pointer focus:border-sky-900 focus:bg-white focus:text-gray-700 focus:outline-none"
        id={labelAttribute}
        onChange={e => onHandleOptionChange(e.target.value)}
      >
        <option value="">Select Option</option>
        {options.map(item => (
          <option key={item!.value} value={item!.value}>
            {item!.label}
          </option>
        ))}
      </select>
    </div>
  );
}
