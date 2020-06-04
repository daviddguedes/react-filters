import React, { createContext, useState, useEffect } from "react";

export const FilterContext = createContext({});

const initialItems = {
  paises: [],
  estados: [],
  cidades: [],
  bairros: [],
};

function FilterContextProvider(props) {
  const [initialState, setInitialState] = useState(initialItems);
  const [paisesState, setPaisesState] = useState([]);
  const [estadosState, setEstadosState] = useState([]);
  const [cidadesState, setCidadesState] = useState([]);
  const [bairrosState, setBairrosState] = useState([]);

  // On select paises
  useEffect(() => {
    const estadosFilteredByPaisesChecked = initialState.estados.filter(
      (estado) => {
        return paisesState.some((pais) => {
          return pais.paisId === estado.paisId && pais.checked;
        });
      }
    );

    if (!paisesState.some((p) => p.checked)) {
      setEstadosState((state) => [...initialState.estados]);
    } else {
      initialState.estados.forEach(estado => {
        if (!estadosFilteredByPaisesChecked.includes(estado)) {
          estado.checked = false;
        }
      });
      setEstadosState((state) => [...estadosFilteredByPaisesChecked]);
    }
  }, [paisesState]);

   // On select estados
  useEffect(() => {
    const cidadesFilteredByEstadosChecked = initialState.cidades.filter(
      (cidade) => {
        return estadosState.some((estado) => {
          return estado.estadoId === cidade.estadoId && estado.checked;
        });
      }
    );

    if (!estadosState.some((p) => p.checked) && estadosState.length) {
      const cidadesFilteredByEstadosVisible = initialState.cidades.filter(
        (cidade) => {
          return estadosState.some((estado) => {
            return estado.estadoId === cidade.estadoId;
          });
        }
      );
      setCidadesState((state) => [...cidadesFilteredByEstadosVisible]);
    } else if (!estadosState.length) {
      setCidadesState((state) => []);
    } else {
      initialState.cidades.forEach(cidade => {
        if (!cidadesFilteredByEstadosChecked.includes(cidade)) {
          cidade.checked = false;
        }
      });
      setCidadesState((state) => [...cidadesFilteredByEstadosChecked]);
    }
  }, [estadosState]);

   // On select cidades
  useEffect(() => {
    const bairrosFilteredByCidadesChecked = initialState.bairros.filter(
      (bairro) => {
        return cidadesState.some((cidade) => {
          return cidade.cidadeId === bairro.cidadeId && cidade.checked;
        });
      }
    );

    if (!cidadesState.some((p) => p.checked) && cidadesState.length) {
      const bairrosFilteredByCidadesVisible = initialState.bairros.filter(
        (bairro) => {
          return cidadesState.some((cidade) => {
            return cidade.cidadeId === bairro.cidadeId;
          });
        }
      );
      setBairrosState((state) => [...bairrosFilteredByCidadesVisible]);
    } else if (!cidadesState.length) {
      setBairrosState((state) => []);
    } else {
      initialState.bairros.forEach(bairro => {
        if (!bairrosFilteredByCidadesChecked.includes(bairro)) {
          bairro.checked = false;
        }
      });
      setBairrosState((state) => [...bairrosFilteredByCidadesChecked]);
    }
  }, [cidadesState]);

   // On select bairros
  useEffect(() => {
    console.log("bairros...");
  }, [bairrosState]);

  return (
    <FilterContext.Provider
      value={[
        initialState,
        setInitialState,
        paisesState,
        setPaisesState,
        estadosState,
        setEstadosState,
        cidadesState,
        setCidadesState,
        bairrosState,
        setBairrosState,
      ]}
    >
      {props.children}
    </FilterContext.Provider>
  );
}

export default FilterContextProvider;
