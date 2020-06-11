import React, { useContext, useEffect } from "react";
import Checkbox from "../Checkbox";
import FilterContext from "../store/context";

function CidadesFilter() {
  const { filterState, filterDispatch } = useContext(FilterContext);

  const onHandleChangeCheckbox = (paramCidades) =>
    filterDispatch({ type: "UPDATE_CIDADES", payload: [...paramCidades] });

  useEffect(() => {
    if (filterState.estadosState && filterState.estadosState.length) {
      const cidadesClone = JSON.parse(JSON.stringify(filterState.cidadesState));
      const resetCidadesList = cidadesClone.map((est) => {
        est.checked = false;
        est.visible = true;
        return est;
      });
      const cidadesFilteredByEstadosChecked = filterState.cidadesState.map(
        (cidade) => {
          let cid = { ...cidade };
          if (
            filterState.estadosState.some(
              (estado) => cidade.estadoId === estado.estadoId && estado.checked
            )
          ) {
            cid.visible = true;
          } else {
            cid.visible = false;
          }
          return cid;
        }
      );

      if (!filterState.estadosState.some((p) => p.checked)) {
        if (filterState.estadosState.every((p) => p.visible)) {
          filterDispatch({ type: "UPDATE_CIDADES", payload: resetCidadesList });
        } else {
          const cidadesFilteredByEstadosVisible = filterState.cidadesState.map(
            (cidade) => {
              let cid = { ...cidade };
              if (
                filterState.estadosState.some(
                  (estado) => cidade.estadoId === estado.estadoId && estado.visible
                )
              ) {
                cid.visible = true;
              } else {
                cid.visible = false;
              }
              return cid;
            }
          );
          filterDispatch({ type: "UPDATE_CIDADES", payload: cidadesFilteredByEstadosVisible });
        }
      } else {
        filterDispatch({
          type: "UPDATE_CIDADES",
          payload: cidadesFilteredByEstadosChecked,
        });
      }
    }
  }, [filterState.estadosState, filterDispatch]);

  return (
    <Checkbox
      items={filterState.cidadesState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="cidadeId"
      title="CIDADES"
    />
  );
}

export default CidadesFilter;
