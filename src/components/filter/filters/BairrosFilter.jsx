import React, { useContext } from "react";
import Checkbox from "../Checkbox";
import { FilterContext } from "../context";

function BairrosFilter() {
  const [, , , , , , , , bairrosState, setBairrosState] = useContext(
    FilterContext
  );

  const onHandleChangeCheckbox = (paramBairros) =>
    setBairrosState((state) => [...paramBairros]);

  return (
    <Checkbox
      items={bairrosState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="bairroId"
      title="BAIRROS"
    />
  );
}

export default BairrosFilter;
