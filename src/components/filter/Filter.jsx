import React, { useContext, useEffect, useState } from "react";
import PaisesFilter from "./filters/PaisesFilter";
import EstadosFilter from "./filters/EstadosFilter";
import CidadesFilter from "./filters/CidadesFilter";
import BairrosFilter from "./filters/BairrosFilter";
import { estados, cidades, bairros, paises } from "./mocks/api";
import "./style.scss";
import FilterContextProvider, { FilterContext } from "./context";
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
  const [
    ,
    setInitialState,
    ,
    setPaisesState,
    ,
    setEstadosState,
    ,
    setCidadesState,
    bairrosState,
    setBairrosState,
  ] = useContext(FilterContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItemsFromAPI()
      .then(({ paises, estados, cidades, bairros }) => {
        const value = {
          paises: paises.map((i) => ({
            ...i,
            checked: i.paisId === "Brazil" ? true : false,
          })),
          estados: estados.map((i) => ({ ...i, checked: false })),
          cidades: cidades.map((i) => ({ ...i, checked: false })),
          bairros: bairros.map((i) => ({ ...i, checked: false })),
        };
        setInitialState(value);
        setPaisesState(value.paises);
        setEstadosState(value.estados);
        setCidadesState(value.cidades);
        setBairrosState(value.bairros);
        setLoading(false);
      })
      .catch((error) => {
        console.log("An error has been occurred...");
      });
  }, []);

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
      {!!bairrosState.filter((b) => b.checked).length && (
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
            {bairrosState
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
