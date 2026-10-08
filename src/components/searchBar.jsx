import { useEffect, useState } from "react";

function SearchBar({ value, onSearch }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(inputValue);
      }}
    >
      <input
        id="searchInput"
        name="searchInput"
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Search for a recipe..."
        aria-label="Search for recipe"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
