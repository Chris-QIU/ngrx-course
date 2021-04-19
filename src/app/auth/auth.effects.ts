import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// import {} from "@"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action-types";

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => {
          if (action.type === "[Login Page] User Login") {
            localStorage.setItem("USER", JSON.stringify(action.user));
            this.router.navigateByUrl("/courses");
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem("USER");
          this.router.navigateByUrl("/login");
        })
      ),
    { dispatch: false }
  );

  // autoLogin$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(

  //     )
  //   )
  // )
  constructor(private actions$: Actions, private router: Router) {}
}
