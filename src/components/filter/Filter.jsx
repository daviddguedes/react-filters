import React, { useContext, useEffect, useState, useCallback } from "react";
import shortid from "shortid";

import FilterStateProvider from "./store/FilterStateProvider";
import FilterContext from "./store/context";
import PaisesFilter from "./filters/PaisesFilter";
import EstadosFilter from "./filters/EstadosFilter";
import CidadesFilter from "./filters/CidadesFilter";
import BairrosFilter from "./filters/BairrosFilter";
import "./style.scss";

import { estados, cidades, bairros, paises } from "./mocks/api";

export const WrapperFilter = () => {
  return (
    <FilterStateProvider>
      <Filter />
    </FilterStateProvider>
  );
};

const getItemsFromAPI = () => {
  return new Promise((resolve, reject) => {
    resolve({ paises, estados, cidades, bairros });
  });
};

function Filter() {
  const { filterState, filterDispatch } = useContext(FilterContext);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({});

  useEffect(() => {
    getItemsFromAPI()
      .then(({ paises, estados, cidades, bairros }) => {
        const value = {
          paises: paises.map((i) => ({ ...i, checked: false, visible: true })),
          estados: estados.map((i) => ({
            ...i,
            checked: false,
            visible: true,
          })),
          cidades: cidades.map((i) => ({
            ...i,
            checked: false,
            visible: true,
          })),
          bairros: bairros.map((i) => ({
            ...i,
            checked: false,
            visible: true,
          })),
        };

        setValues((oldValues) => ({
          initialState: JSON.parse(JSON.stringify(value)),
          paisesState: value.paises,
          estadosState: value.estados,
          cidadesState: value.cidades,
          bairrosState: value.bairros,
        }));

        setLoading(false);
      })
      .catch((error) => {
        console.log("An error has been occurred...");
      });
  }, []);

  const callDispatch = useCallback(({ type, payload }) => {
    return filterDispatch({ type, payload });
  }, [filterDispatch]);

  useEffect(() => {
    if (!loading) {
      callDispatch({
        type: "UPDATE_PAISES",
        payload: values.paisesState.map((i) => ({
          ...i,
          checked: i.paisId === "Brazil" ? true : false,
          visible: true,
        })),
      });

      callDispatch({
        type: "UPDATE_ESTADOS",
        payload: values.estadosState,
      });

      callDispatch({
        type: "UPDATE_CIDADES",
        payload: values.cidadesState,
      });

      callDispatch({
        type: "UPDATE_BAIRROS",
        payload: values.bairrosState,
      });
    }
  }, [values, loading, callDispatch]);

  return (
    <div className="divRoot">
      {loading ? (
        <>
          <div className="loading">
            <h1>LOADING...</h1>
          </div>
        </>
      ) : (
        <>
          <div className="checkColumns">
            <div className="checkboxContainer">
              <PaisesFilter />
            </div>
            <div className="checkboxContainer">
              <EstadosFilter />
            </div>
            <div className="checkboxContainer">
              <CidadesFilter />
            </div>
          </div>
          <div className="checkColumns">
            <div className="checkboxContainer">
              <BairrosFilter />
            </div>
          </div>
        </>
      )}
      {filterState.bairrosState &&
        !!filterState.bairrosState.filter((b) => b.checked).length && (
          <table className="tbBairros">
            <thead>
              <tr>
                <th>País</th>
                <th>Estado</th>
                <th>Cidade</th>
                <th>Bairro</th>
              </tr>
            </thead>
            <tbody>
              {filterState.bairrosState
                .filter((b) => b.checked)
                .map((bairro) => (
                  <tr key={shortid.generate()}>
                    <td>{bairro.paisId}</td>
                    <td>{bairro.estadoId}</td>
                    <td>{bairro.cidadeId}</td>
                    <td>{bairro.bairroId}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
    </div>
  );
}

export default Filter;
