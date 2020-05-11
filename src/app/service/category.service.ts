import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
import {CategoryDTO} from '../dto/CategoryDTO';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('astro:123')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllCategory(text: string, count: number, page: number) {
    // return this.http.get<Array<CategoryDTO>>('http://localhost:8803/api/airforce/category?text&count=0&page=0');
    return this.http.get<Array<CategoryDTO>>('http://localhost:8803/api/airforce/category' + '?text=' + text + '&count=' + count + '&page=' + page);
  }

  addCategory(categoryDTO: CategoryDTO) {
    return this.http.post <CategoryDTO>('http://localhost:8803/api/airforce/category', categoryDTO);
  }

}
