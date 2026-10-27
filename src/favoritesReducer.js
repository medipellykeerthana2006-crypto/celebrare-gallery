export function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      if (state.includes(action.id)) {
        return state.filter((id) => id !== action.id)
      }

      return [...state, action.id]

    default:
      return state
  }
}