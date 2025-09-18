import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "./api";
import "./search.css"; // custom styles

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    if (!inputValue || inputValue.length < 3) {
      return { options: [] };
    }

    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const result = await response.json();

      return {
        options: result.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error("Error fetching cities:", error);
      return { options: [] };
    }
  };

  const handleChange = (selectedOption) => {
    setSearch(selectedOption);
    onSearchChange(selectedOption);
  };

  return (
    <div className="search-container">
      <AsyncPaginate
        placeholder="🔍 Search for a city"
        debounceTimeout={600}
        value={search}
        onChange={handleChange}
        loadOptions={loadOptions}
        classNamePrefix="react-select"
      />
    </div>
  );
}

export default Search;
