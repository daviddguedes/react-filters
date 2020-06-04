export default function Selecteds() {

    this._paisesSelecionados = [];
    this._estadosSelecionados = [];
    this._cidadesSelecionadas = [];
    this._bairrosSelecionados = [];

    const _setPaises = paises => this._paisesSelecionados = paises;
    const _addPais = pais => this._paisesSelecionados.push(pais);

    const _setEstados = estados => this._estadosSelecionados = estados;
    const _setCidades = cidades => this._cidadesSelecionadas = cidades;
    const _setBairros = bairros => this._bairrosSelecionados = bairros;
    const _addBairro = bairro => this._bairrosSelecionados.push(bairro);

    return {
        getPaisesSelecionados: () => this._paisesSelecionados,
        addPaisSelecionado: (item) => _addPais(item),
        getEstadosSelecionados: () => this._estadosSelecionados,
        getCidadesSelecionadas: () => this._cidadesSelecionadas,
        getBairrosSelecionados: () => this._bairrosSelecionados,
        setPaisesSelecionados: (items) => _setPaises(items),
        setEstadosSelecionados: (items) => _setEstados(items),
        setCidadesSelecionados: (items) => _setCidades(items),
        setBairrosSelecionados: (items) => _setBairros(items),
        addBairroSelecionado: (item) => _addBairro(item),
    }
}