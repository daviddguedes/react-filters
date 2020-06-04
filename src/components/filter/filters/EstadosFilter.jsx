import React, { useContext } from "react";
import Checkbox from "../Checkbox";
import { FilterContext } from "../context";

function EstadosFilter() {
  const [, , , , estadosState, setEstadosState, , , , ,] = useContext(
    FilterContext
  );

  const onHandleChangeCheckbox = (paramEstados) =>
    setEstadosState((state) => [...paramEstados]);

  return (
    <Checkbox
      items={estadosState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="estadoId"
      title="ESTADOS"
    />
  );
}

export default EstadosFilter;
