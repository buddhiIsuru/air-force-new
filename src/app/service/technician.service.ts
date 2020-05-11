import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TechnicianDTO} from '../dto/TechnicianDTO';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('astro:123')
  })
};

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(
    private http: HttpClient
  ) {
  }

  addTechnician(tech: TechnicianDTO): Observable<TechnicianDTO> {
    return this.http.post<TechnicianDTO>('http://5.189.148.181:8080/tool-management/api/airforce/technicia', tech);
  }

  updateTechnician() {
  }

  getAllTechnician(text: string, count: number, page: number): Observable<Array<TechnicianDTO>> {
    return this.http.get<Array<TechnicianDTO>>('http://5.189.148.181:8080/tool-management/api/airforce/technicia' + '?text=' + text + '&count=' + count + '&page=' + page );
  }

  searchTechnicianid(id): Observable<TechnicianDTO> {
    console.log('searchTechnician1');
    return this.http.get<TechnicianDTO>('http://5.189.148.181:8080/tool-management/api/airforce/technicia/' + id );
  }

  deleteTechnician() {
  }

}
