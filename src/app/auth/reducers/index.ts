import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { AuthActions } from "../action-types";
import { AuthService } from "../auth.service";
import { User } from "../model/user.model";

export interface AuthState {
  user: User;
}

export const initState: AuthState = { user: null };

export const authReducer = createReducer(
  initState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: null,
    };
  })
);
