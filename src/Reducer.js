export const initialState = {
  user: null,
}

export const actionTyps = {
  SET_USER: 'SET_USER',
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTyps.SET_USER:
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}

export default reducer
