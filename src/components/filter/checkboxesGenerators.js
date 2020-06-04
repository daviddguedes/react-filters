/* @ts-check */
import React, { useState } from "react";
import shortid from "shortid";
import Checkbox from "./Checkbox";
import { paises, estados, cidades, bairros } from "./mocks/api";

export default function Generators(items) {
  const _generatePaises = () => {
    const onHandleChangeCheckbox = (label) => {
        const filtered = paises.filter(p => label === p.paisId);
        items.addPaisSelecionado(filtered[0]);
    }
    return paises.map((pais) => (
      <Checkbox
        key={shortid.generate()}
        handleCheckboxChange={onHandleChangeCheckbox}
        label={pais.paisId}
      />
    ));
  };

  const _generateEstados = () => {
    const onHandleChangeCheckbox = (label) => console.log(label);
    const paisesSelecionados = items.getPaisesSelecionados();
    return estados
      .filter((estado) =>
        paisesSelecionados.some((pais) => pais.paisId === estado.paisId)
      )
      .map((estado) => (
        <Checkbox
          key={shortid.generate()}
          handleCheckboxChange={onHandleChangeCheckbox}
          label={estado.estadoId}
        />
      ));
  };

  const _generateCidades = () => {
    const onHandleChangeCheckbox = (label) => console.log(label);
    return cidades.map((cidade) => (
      <Checkbox
        key={shortid.generate()}
        handleCheckboxChange={onHandleChangeCheckbox}
        label={cidade.cidadeId}
      />
    ));
  };

  const _generateBairros = () => {
    const onHandleChangeCheckbox = (label) => console.log(label);
    return bairros.map((bairro) => (
      <Checkbox
        key={shortid.generate()}
        handleCheckboxChange={onHandleChangeCheckbox}
        label={bairro.bairroId}
      />
    ));
  };

  return {
    generatePaises: _generatePaises(),
    generateEstados: _generateEstados(),
    generateCidades: _generateCidades(),
    generateBairros: _generateBairros(),
  };
}
