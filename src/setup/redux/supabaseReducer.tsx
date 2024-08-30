// src/redux/reducers/supabaseReducer.ts
import {SET_SUPABASE_CLIENT} from './actions/supabeActions'

const initialState = {
  client: null,
}

export const supabaseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SUPABASE_CLIENT:
      return {
        ...state,
        client: action.payload,
      }
    default:
      return state
  }
}
