import React, { useContext, useEffect } from "react";
import Checkbox from "../Checkbox";
import FilterContext from "../store/context";

function BairrosFilter() {
  const { filterState, filterDispatch } = useContext(FilterContext);

  const onHandleChangeCheckbox = (paramBairros) =>
    filterDispatch({ type: "UPDATE_BAIRROS", payload: [...paramBairros] });

  useEffect(() => {
    if (filterState.cidadesState && filterState.cidadesState.length) {
      const bairrosClone = JSON.parse(JSON.stringify(filterState.bairrosState));
      const resetBairrosList = bairrosClone.map((est) => {
        est.checked = false;
        est.visible = true;
        return est;
      });
      const bairrosFilteredByCidadesChecked = filterState.bairrosState.map(
        (bairro) => {
          let bai = { ...bairro };
          if (
            filterState.cidadesState.some(
              (cidade) => bai.cidadeId === cidade.cidadeId && cidade.checked
            )
          ) {
            bai.visible = true;
          } else {
            bai.visible = false;
          }
          return bai;
        }
      );

      if (!filterState.cidadesState.some((p) => p.checked)) {
        if (filterState.cidadesState.every((p) => p.visible)) {
          filterDispatch({ type: "UPDATE_BAIRROS", payload: resetBairrosList });
        } else {
          const bairrosFilteredByCidadesVisible = filterState.bairrosState.map(
            (bairro) => {
              let bai = { ...bairro };
              if (
                filterState.cidadesState.some(
                  (cidade) => bai.cidadeId === cidade.cidadeId && cidade.visible
                )
              ) {
                bai.visible = true;
              } else {
                bai.visible = false;
              }
              return bai;
            }
          );
          filterDispatch({
            type: "UPDATE_BAIRROS",
            payload: bairrosFilteredByCidadesVisible,
          });
        }
      } else {
        filterDispatch({
          type: "UPDATE_BAIRROS",
          payload: bairrosFilteredByCidadesChecked,
        });
      }
    }
  }, [filterState.cidadesState, filterDispatch]);

  const cidadeIsChecked = (cidadeId) =>
    filterState.cidadesState.find((c) => c.cidadeId === cidadeId).checked;

  return (
    <Checkbox
      items={filterState.bairrosState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="bairroId"
      title="BAIRROS"
    />
  );
}

export default BairrosFilter;
