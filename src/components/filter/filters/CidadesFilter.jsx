import React, { useContext, useEffect } from "react";
import Checkbox from "../Checkbox";
import { FilterContext } from "../context";

function CidadesFilter() {
  // const [, , , , , , cidadesState, setCidadesState, , ,] = useContext(
  //   FilterContext
  // );

  // const onHandleChangeCheckbox = (paramCidades) =>
  //   setCidadesState((state) => [...paramCidades]);

  const [state, dispatch] = useContext(FilterContext);

  const onHandleChangeCheckbox = (paramCidades) =>
    dispatch({ type: "UPDATE_CIDADES", payload: [...paramCidades] });

    useEffect(() => {
      const bairrosClone = JSON.parse(JSON.stringify(state.initialState.bairros));
      const bairrosFilteredByCidadesChecked = bairrosClone.filter(
        (bairro) => {
          return state.cidadesState.some((cidade) => {
            return cidade.cidadeId === bairro.cidadeId && cidade.checked;
          });
        }
      );
  
      if (
        !state.cidadesState.some((p) => p.checked) &&
        state.cidadesState.length
      ) {
        const bairrosFilteredByCidadesVisible = bairrosClone.filter(
          (bairro) => {
            return state.cidadesState.some((cidade) => {
              return cidade.cidadeId === bairro.cidadeId;
            });
          }
        );
        dispatch({
          type: "UPDATE_BAIRROS",
          payload: [...bairrosFilteredByCidadesVisible],
        });
      } else if (!state.cidadesState.length) {
        dispatch({ type: "UPDATE_BAIRROS", payload: [] });
      } else {
        console.log('aqui...bairros')
        dispatch({
          type: "UPDATE_BAIRROS",
          payload: [...bairrosFilteredByCidadesChecked],
        });
      }
    }, [state.cidadesState]);

  return (
    <Checkbox
      items={state.cidadesState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="cidadeId"
      title="CIDADES"
    />
  );
}

export default CidadesFilter;
