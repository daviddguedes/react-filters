import React, { useContext } from "react";
import Checkbox from "../Checkbox";
import FilterContext from "../store/context";

function PaisesFilter() {
  const { filterState, filterDispatch } = useContext(FilterContext);

  const onHandleChangeCheckbox = (paramPaises) =>
    filterDispatch({ type: "UPDATE_PAISES", payload: [...paramPaises] });

  return (
    <Checkbox
      items={filterState.paisesState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="paisId"
      title="PAíSES"
    />
  );
}

export default PaisesFilter;
