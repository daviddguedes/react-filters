import React, { useContext, useEffect } from "react";
import Checkbox from "../Checkbox";
import { FilterContext } from "../context";

function EstadosFilter() {
  // const [, , , , estadosState, setEstadosState, , , , ,] = useContext(
  //   FilterContext
  // );

  // const onHandleChangeCheckbox = (paramEstados) =>
  //   setEstadosState((state) => [...paramEstados]);

  const [state, dispatch] = useContext(FilterContext);

  const onHandleChangeCheckbox = (paramEstados) =>
    dispatch({ type: "UPDATE_ESTADOS", payload: [...paramEstados] });

  useEffect(() => {
    const cidadesClone = JSON.parse(JSON.stringify(state.initialState.cidades));
    const cidadesFilteredByEstadosChecked = cidadesClone.filter(
      (cidade) => {
        return state.estadosState.some((estado) => {
          return estado.estadoId === cidade.estadoId && estado.checked;
        });
      }
    );

    if (!state.estadosState.some((p) => p.checked) && state.estadosState.length) {
      const cidadesFilteredByEstadosVisible = cidadesClone.filter(
        (cidade) => {
          return state.estadosState.some((estado) => {
            return estado.estadoId === cidade.estadoId;
          });
        }
      );
      dispatch({type: 'UPDATE_CIDADES', payload: [...cidadesFilteredByEstadosVisible]});
    } else if (!state.estadosState.length) {
      dispatch({type: 'UPDATE_CIDADES', payload: []});
    } else {
      dispatch({type: 'UPDATE_CIDADES', payload: [...cidadesFilteredByEstadosChecked]});
    }
  }, [state.estadosState]);

  return (
    <Checkbox
      items={state.estadosState}
      handleCheckboxChange={onHandleChangeCheckbox}
      label="estadoId"
      title="ESTADOS"
    />
  );
}

export default EstadosFilter;
