import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {UserDTO} from '../dto/userDTO';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: String, password: String): Observable<UserDTO> {
    console.log('AuthService');
    // return this.http.get<any>('http://5.189.148.181:8080/tool-management/api/airforce/login?' + 'username=' + username + '&password=' + password)
    return this.http.get<any>('http://5.189.148.181:8080/tool-management/api/airforce/login?' + 'username=' + username + '&password=' + password)
      .pipe(
        map((result: any) => {
          console.log('AuthService' + JSON.stringify(result));
          if (result) {
            this.token = result;
            console.log('token' + result);
            sessionStorage.setItem('token', JSON.stringify(result));
            this.router.navigate(['/main']);
          }
          return result;
        })
      );
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token') === 'false' ? false : true;
    }
  }

  logout(): void {

    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
