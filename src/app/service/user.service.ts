import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDTO} from '../dto/userDTO';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  addUser(user: UserDTO): Observable<UserDTO> {
    console.log(JSON.stringify(user));
    return this.http.post<UserDTO>('http://5.189.148.181:8080/tool-management/api/airforce/user', user);
  }

  getAllUser(text: string, count: number, page: number) {
    return this.http.get<Array<UserDTO>>('http://5.189.148.181:8080/tool-management/api/airforce/user' + '?text=' + text + '&count=' + count + '&page=' + page);
  }

}
