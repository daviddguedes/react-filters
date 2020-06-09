import React, { useContext, useEffect } from "react";
import Checkbox from "../Checkbox";
import { FilterContext } from "../context";

function PaisesFilter() {
  console.log('montou o componente paises')

  const [state, dispatch] = useContext(FilterContext);

  const onHandleChangeCheckbox = (paramPaises) =>
    dispatch({ type: "UPDATE_PAISES", payload: [...paramPaises] });

  useEffect(() => {
    const estadosClone = JSON.parse(JSON.stringify(state.initialState.estados));
    const estadosFilteredByPaisesChecked = estadosClone.filter(
      (estado) => {
        return state.paisesState.some((pais) => {
          return pais.paisId === estado.paisId && pais.checked;
        });
      }
    );

    if (!state.paisesState.some((p) => p.checked)) {
      dispatch({type: 'UPDATE_ESTADOS', payload: estadosClone});
    } else {
      dispatch({type: 'UPDATE_ESTADOS', payload: [...estadosFilteredByPaisesChecked]});
    }
  }, [state.paisesState]);

  return (
    <Checkbox
      items={state.paisesState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="paisId"
      title="PAíSES"
    />
  );
}

export default PaisesFilter;
