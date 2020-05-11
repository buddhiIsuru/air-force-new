import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DepartmentDTO} from '../dto/DepartmentDTO';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('astro:123')
  })
};

@Injectable({
  providedIn: 'root'
})
export class DepatmentService {

  constructor(
    private http: HttpClient
  ) {
  }

  addDepatment(depatment: DepartmentDTO): Observable<DepartmentDTO> {
    return this.http.post<DepartmentDTO>('http://5.189.148.181:8080/tool-management/api/airforce/department' , depatment );
  }

  getAllDepartment(text: string, count: number, page: number): Observable<Array<DepartmentDTO>> {
    return this.http.get<Array<DepartmentDTO>>('http://5.189.148.181:8080/tool-management/api/airforce/department' + '?text=' + text + '&count=' + count + '&page=' + page );
  }
}
