import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToolDTO} from '../dto/toolDTO';
import {Observable} from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('astro:123')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(
    private http: HttpClient
  ) {
  }

  addTool(toolDTO: ToolDTO): Observable<Array<any>> {
    return this.http.post<Array<any>>('http://5.189.148.181:8080/tool-management/api/airforce/item', toolDTO);
  }

  updateTool(toolDto: ToolDTO): Observable<Array<any>> {
    return this.http.put<Array<any>>('http://5.189.148.181:8080/tool-management/api/airforce/item', toolDto);
  }

  searchTool() {
  }

  getAllTool(text: string, count: number, page: number): Observable<Array<ToolDTO>> {
    return this.http.get<Array<ToolDTO>>
    ('http://5.189.148.181:8080/tool-management/api/airforce/item' + '?text=' + text + '&count=' + count + '&page=' + page);
  }

  deleteTool(id: number): Observable<Boolean> {
    return this.http.delete<Boolean>('http://5.189.148.181:8080/tool-management/api/airforce/item' + id );
  }

  getAll(status: string): Observable<Array<ToolDTO>> {
    console.log('Too getAll');
    return this.http.get<Array<ToolDTO>>('http://5.189.148.181:8080/tool-management/api/airforce/item/avalible' + '?status=' + status );
  }

  getItemById(id: number): Observable<ToolDTO> {
    // alert('get Tool By Id');
    return this.http.get<ToolDTO>('http://5.189.148.181:8080/tool-management/api/airforce/item/' + id );
  }


}
