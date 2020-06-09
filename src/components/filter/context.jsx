import React, { createContext, useState, useEffect, useReducer } from "react";
import filterReducer from "./filterReducer";

export const FilterContext = createContext({});

// const initialItems = {
//   paises: [],
//   estados: [],
//   cidades: [],
//   bairros: [],
// };
export const INITIAL_STATE = {
  initialState: {
    paises: [],
    estados: [],
    cidades: [],
    bairros: [],
  },
  paisesState: [],
  estadosState: [],
  cidadesState: [],
  bairrosState: [],
};

function FilterContextProvider(props) {
  // const [initialState, setInitialState] = useState(initialItems);
  // const [paisesState, setPaisesState] = useState([]);
  // const [estadosState, setEstadosState] = useState([]);
  // const [cidadesState, setCidadesState] = useState([]);
  // const [bairrosState, setBairrosState] = useState([]);
  const [state, dispatch] = useReducer(filterReducer, INITIAL_STATE);

  // On select paises
  // useEffect(() => {
    // const estadosFilteredByPaisesChecked = [...initialState.estados].filter(
    //   (estado) => {
    //     return paisesState.some((pais) => {
    //       return pais.paisId === estado.paisId && pais.checked;
    //     });
    //   }
    // );

    // if (!paisesState.some((p) => p.checked)) {
    //   setEstadosState((state) => [...initialState.estados]);
    // } else {
    //   initialState.estados.forEach((estado) => {
    //     if (!estadosFilteredByPaisesChecked.includes(estado)) {
    //       estado.checked = false;
    //     }
    //   });
    //   setEstadosState((state) => [...estadosFilteredByPaisesChecked]);
    // }
  // }, [paisesState]);

  // On select estados
  // useEffect(() => {
    // const cidadesFilteredByEstadosChecked = initialState.cidades.filter(
    //   (cidade) => {
    //     return estadosState.some((estado) => {
    //       return estado.estadoId === cidade.estadoId && estado.checked;
    //     });
    //   }
    // );

    // if (!estadosState.some((p) => p.checked) && estadosState.length) {
    //   initialState.cidades.forEach((cidade) => (cidade.checked = false));
    //   const cidadesFilteredByEstadosVisible = initialState.cidades.filter(
    //     (cidade) => {
    //       return estadosState.some((estado) => {
    //         return estado.estadoId === cidade.estadoId;
    //       });
    //     }
    //   );
    //   setCidadesState((state) => [...cidadesFilteredByEstadosVisible]);
    // } else if (!estadosState.length) {
    //   setCidadesState((state) => []);
    // } else {
    //   initialState.cidades.forEach((cidade) => {
    //     if (!cidadesFilteredByEstadosChecked.includes(cidade)) {
    //       cidade.checked = false;
    //     }
    //   });
    //   setCidadesState((state) => [...cidadesFilteredByEstadosChecked]);
    // }
  // }, [estadosState]);

  // On select cidades
  // useEffect(() => {
    // const bairrosFilteredByCidadesChecked = initialState.bairros.filter(
    //   (bairro) => {
    //     return cidadesState.some((cidade) => {
    //       return cidade.cidadeId === bairro.cidadeId && cidade.checked;
    //     });
    //   }
    // );

    // if (!cidadesState.some((p) => p.checked) && cidadesState.length) {
    //   initialState.bairros.forEach((bairro) => (bairro.checked = false));
    //   const bairrosFilteredByCidadesVisible = initialState.bairros.filter(
    //     (bairro) => {
    //       return cidadesState.some((cidade) => {
    //         return cidade.cidadeId === bairro.cidadeId;
    //       });
    //     }
    //   );
    //   setBairrosState((state) => [...bairrosFilteredByCidadesVisible]);
    // } else if (!cidadesState.length) {
    //   setBairrosState((state) => []);
    // } else {
    //   initialState.bairros.forEach((bairro) => {
    //     if (!bairrosFilteredByCidadesChecked.includes(bairro)) {
    //       bairro.checked = false;
    //     }
    //   });
    //   setBairrosState((state) => [...bairrosFilteredByCidadesChecked]);
    // }
  // }, [cidadesState]);

  // On select bairros
  // useEffect(() => {
  //   console.log(bairrosState);
  // }, [bairrosState]);

  useEffect(() => {
    console.log('Context', state)
  }, [state]);

  return (
    <FilterContext.Provider
      value={[
        state, dispatch
        // initialState,
        // setInitialState,
        // paisesState,
        // setPaisesState,
        // estadosState,
        // setEstadosState,
        // cidadesState,
        // setCidadesState,
        // bairrosState,
        // setBairrosState,
      ]}
    >
      {props.children}
    </FilterContext.Provider>
  );
}

export default FilterContextProvider;
