const FilterBar = ({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (s: string) => void;
}) => {
  const options = ["All", "Open", "Completed"];
  return (
    <div className="mb-4">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
