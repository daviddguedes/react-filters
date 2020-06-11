import React from "react";
import FilterContext from "./context";
import useFilterState from "./useFilterState";

const FilterStateProvider = ({ children }) => {
  console.log('teste')
  return (
    <FilterContext.Provider value={useFilterState()}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterStateProvider;
