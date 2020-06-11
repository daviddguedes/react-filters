import React, { useContext } from "react";
import Checkbox from "../Checkbox";
import FilterContext from "../store/context";
import { useEffect } from "react";

function EstadosFilter() {
  const { filterState, filterDispatch } = useContext(FilterContext);

  const onHandleChangeCheckbox = (paramEstados) => {
    filterDispatch({ type: "UPDATE_ESTADOS", payload: [...paramEstados] });
  };

  useEffect(() => {
    if (filterState.paisesState && filterState.paisesState.length) {
      const resetEstadosList = filterState.estadosState.map((est) => {
        est.checked = false;
        est.visible = true;
        return est;
      });
      const estadosFilteredByPaisesChecked = filterState.estadosState.map(
        (estado) => {
          let est = { ...estado };
          if (
            filterState.paisesState.some(
              (pais) => pais.paisId === estado.paisId && pais.checked
            )
          ) {
            est.visible = true;
          } else {
            est.visible = false;
          }
          return est;
        }
      );

      if (!filterState.paisesState.some((p) => p.checked)) {
        filterDispatch({ type: "UPDATE_ESTADOS", payload: resetEstadosList });
      } else {
        filterDispatch({
          type: "UPDATE_ESTADOS",
          payload: estadosFilteredByPaisesChecked,
        });
      }
    }
  }, [filterState.paisesState, filterDispatch]);

  return (
    <Checkbox
      items={filterState.estadosState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="estadoId"
      title="ESTADOS"
    />
  );
}

export default EstadosFilter;
