import React, { createContext, useState, useEffect, useReducer } from "react";
import filterReducer from "./filterReducer";

export const FilterContext = createContext();

export const INITIAL_STATE = {
  initialState: {
    paises: [],
    estados: [],
    cidades: [],
    bairros: [],
  },
  paisesState: [],
  estadosState: [],
  cidadesState: [],
  bairrosState: [],
};

function FilterContextProvider(props) {
  const [state, dispatch] = useReducer(filterReducer, INITIAL_STATE);

  useEffect(() => {
    console.log("Context", state);
  }, [state]);

  return (
    <FilterContext.Provider value={[state, dispatch]}>
      {props.children}
    </FilterContext.Provider>
  );
}

export default FilterContextProvider;
