import React, { useContext } from "react";
import Checkbox from "../Checkbox";
import { FilterContext } from "../context";

function PaisesFilter() {
  const [, , paisesState, setPaisesState, , , , , , ,] = useContext(
    FilterContext
  );

  const onHandleChangeCheckbox = (paramPaises) =>
    setPaisesState((state) => [...paramPaises]);

  return (
    <Checkbox
      items={paisesState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="paisId"
      title="PAíSES"
    />
  );
}

export default PaisesFilter;
