// src/redux/reducers/RootReducer.ts
import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'
import {supabaseReducer} from './supabaseReducer'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  supabase: supabaseReducer, 
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
