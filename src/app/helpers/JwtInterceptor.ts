import {Injectable, Injector} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {current} from 'codelyzer/util/syntaxKind';
import {AuthService} from '../service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    console.log('JwtInterceptor');
    // const currentUser1 = JSON.stringify(sessionStorage.getItem('token'));
    const currentUser = JSON.parse(sessionStorage.getItem('token'));
    const authService = this.injector.get(AuthService);
    console.log('JwtInterceptor currentUser :- ' + currentUser);
    if (currentUser !== null) {
      console.log('JwtInterceptor currentUser user name :- ' + currentUser.username + '  -:-  ' + currentUser.password);
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ` + btoa(currentUser.username + ':' + currentUser.password),
        }
      });
    }
    return next.handle(request);
  }
}
