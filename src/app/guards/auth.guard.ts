import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard');
    if (sessionStorage.getItem('token')) {
      console.log('AuthGuard get Item result ' + sessionStorage.getItem('token'));
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
