import React, { useContext } from "react";
import Checkbox from "../Checkbox";
import { FilterContext } from "../context";

function CidadesFilter() {
  const [, , , , , , cidadesState, setCidadesState, , ,] = useContext(
    FilterContext
  );

  const onHandleChangeCheckbox = (paramCidades) =>
    setCidadesState((state) => [...paramCidades]);

  return (
    <Checkbox
      items={cidadesState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="cidadeId"
      title="CIDADES"
    />
  );
}

export default CidadesFilter;
