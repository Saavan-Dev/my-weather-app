export function InputField({ inputValue, onInputChange, children }) {
  return (
    <input
      type="text"
      placeholder={children}
      className={"premium-input"}
      value={inputValue}
      onChange={(event) => onInputChange(event.target.value)}
    />
  );
}
