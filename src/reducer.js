export const initialState = {
  user: null,
  themeIsDark: true,
  cars: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'APPEND_CARS':
      return {
        ...state,
        cars: action.payload
      }
    case 'APPEND_CAR':
      return {
        ...state,
        cars: [...state.cars, action.payload]
      }
    case 'CLEAR_CARS':
      return {
        ...state,
        cars: []
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    case 'TOGGLE_THEME':

      return {
        ...state,
        themeIsDark: !state.themeIsDark
      }
    default:
      return state
  }
}

export default reducer