import React, { useContext, useEffect, useState, useCallback } from "react";
import PaisesFilter from "./filters/PaisesFilter";
import EstadosFilter from "./filters/EstadosFilter";
import CidadesFilter from "./filters/CidadesFilter";
import BairrosFilter from "./filters/BairrosFilter";
import { estados, cidades, bairros, paises } from "./mocks/api";
import "./style.scss";
import FilterContextProvider, { FilterContext, INITIAL_STATE } from "./context";
import shortid from "shortid";

export const WrapperFilter = () => {
  return (
    <FilterContextProvider>
      <Filter />
    </FilterContextProvider>
  );
};

const getItemsFromAPI = () => {
  return new Promise((resolve, reject) => {
    resolve({ paises, estados, cidades, bairros });
  });
};

function Filter() {
  const [state, dispatch] = useContext(FilterContext);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(INITIAL_STATE);

  const initialDispatch = useCallback(
    () =>
      dispatch({
        type: "UPDATE_STATE",
        payload: values.initialState,
      }),
    [values.initialState]
  );

  const paisesDispatch = useCallback(
    () =>
      dispatch({
        type: "UPDATE_PAISES",
        payload: values.paisesState.map((i) => ({
          ...i,
          checked: i.paisId === "Brazil" ? true : false,
        })),
      }),
    [values.paisesState]
  );

  const estadosDispatch = useCallback(
    () =>
      dispatch({
        type: "UPDATE_ESTADOS",
        payload: values.estadosState,
      }),
    [values.estadosState]
  );

  const cidadesDispatch = useCallback(
    () =>
      dispatch({
        type: "UPDATE_CIDADES",
        payload: values.cidadesState,
      }),
    [values.cidadesState]
  );

  const bairrosDispatch = useCallback(
    () =>
      dispatch({
        type: "UPDATE_BAIRROS",
        payload: values.bairrosState,
      }),
    [values.bairrosState]
  );

  useEffect(() => {
    getItemsFromAPI()
      .then(({ paises, estados, cidades, bairros }) => {
        const value = {
          paises: paises.map((i) => ({ ...i, checked: false })),
          estados: estados.map((i) => ({ ...i, checked: false })),
          cidades: cidades.map((i) => ({ ...i, checked: false })),
          bairros: bairros.map((i) => ({ ...i, checked: false })),
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

  useEffect(() => {
    if (!loading) {
      initialDispatch();
      paisesDispatch();
      estadosDispatch();
      cidadesDispatch();
      bairrosDispatch();
    }
  }, [loading]);

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
      {!!state.bairrosState.filter((b) => b.checked).length && (
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
            {state.bairrosState
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
