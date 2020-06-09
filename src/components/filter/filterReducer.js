const filterReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return {
        ...state,
        initialState: action.payload,
      };
      break;

    case "UPDATE_PAISES":
      console.log("action update paises");
      return {
        ...state,
        paisesState: action.payload,
      };
      break;

    case "UPDATE_ESTADOS":
      return {
        ...state,
        estadosState: action.payload,
      };

    case "UPDATE_CIDADES":
      return {
        ...state,
        cidadesState: action.payload,
      };

    case "UPDATE_BAIRROS":
      return {
        ...state,
        bairrosState: action.payload,
      };

    default:
      return state;
      break;
  }
};

export default filterReducer;
