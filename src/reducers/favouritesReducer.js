export const initialState = [];

export default function favouritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVOURITE': {
      if (state.includes(action.payload)) return state;
      return [...state, action.payload];
    }

    case 'REMOVE_FAVOURITE': {
      return state.filter((id) => id !== action.payload);
    }

    case 'TOGGLE_FAVOURITE': {
      if (state.includes(action.payload)) {
        return state.filter((id) => id !== action.payload);
      }
      return [...state, action.payload];
    }

    case 'SET_FAVOURITES': {
      return Array.isArray(action.payload) ? action.payload : [];
    }

    default: {
      return state;
    }
  }
}
