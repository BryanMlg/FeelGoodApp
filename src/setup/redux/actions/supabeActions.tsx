// src/redux/actions/supabaseActions.ts
export const SET_SUPABASE_CLIENT = 'SET_SUPABASE_CLIENT'

export const setSupabaseClient = (client: any) => ({
  type: SET_SUPABASE_CLIENT,
  payload: client,
})
