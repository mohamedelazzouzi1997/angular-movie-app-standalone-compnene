import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiKey = environment.apiKey;
  private baseUrl = environment.baseUrl;
  private domain = environment.domain;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  requestToken(): Observable<any> {
    const url = `${this.baseUrl}/authentication/token/new`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey),
    };
    return this.http.get(url, options);
  }

  createSession(token: any): Observable<any> {
    const url = `${this.baseUrl}/authentication/session/new`;
    const options = {
      params: new HttpParams().set('api_key', this.apiKey),
    };
    return this.http.post(url, {
      "request_token": token
    }, options);
  }

  isAuthenticated() {
    return this.cookieService.check('TMDB-session-id')
  }

}
