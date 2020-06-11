import { useReducer } from "react";

const INITIAL_STATE = {
  paisesState: [],
  estadosState: [],
  cidadesState: [],
  bairrosState: [],
};

const reducer = (state, action) => {
  console.log(action.type, action.payload)
  switch (action.type) {
    case "UPDATE_PAISES":
      return {
        ...state,
        paisesState: action.payload,
      };

    case "UPDATE_ESTADOS":
      return {
        ...state,
        estadosState: action.payload,
      };

    case "UPDATE_CIDADES":
      return {
        ...state,
        cidadesState: action.payload,
      };

    case "UPDATE_BAIRROS":
      return {
        ...state,
        bairrosState: action.payload,
      };

    default:
      return state;
  }
};

const useFilterState = () => {
  const [filterState, filterDispatch] = useReducer(reducer, INITIAL_STATE);

  return { filterState, filterDispatch };
};

export default useFilterState;
