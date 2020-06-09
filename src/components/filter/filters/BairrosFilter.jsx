import React, { useContext } from "react";
import Checkbox from "../Checkbox";
import { FilterContext } from "../context";

function BairrosFilter() {
  console.log('montou o componente bairros')
  // const [, , , , , , , , bairrosState, setBairrosState] = useContext(
  //   FilterContext
  // );

  // const onHandleChangeCheckbox = (paramBairros) =>
  //   setBairrosState((state) => [...paramBairros]);

  const [state, dispatch] = useContext(FilterContext);

  const onHandleChangeCheckbox = (paramBairros) =>
    dispatch({ type: "UPDATE_BAIRROS", payload: [...paramBairros] });

  return (
    <Checkbox
      items={state.bairrosState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="bairroId"
      title="BAIRROS"
    />
  );
}

export default BairrosFilter;
