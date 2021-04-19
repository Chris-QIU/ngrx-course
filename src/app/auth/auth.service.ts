import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./model/user.model";
import { AppState } from "../reducers";
import { Store } from "@ngrx/store";
import { logout } from "./auth.actions";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>("/api/login", { email, password });
  }

  logout() {
    this.store.dispatch(logout());
  }
}
