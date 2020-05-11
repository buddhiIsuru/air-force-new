import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ReserveDTO} from '../dto/ReserveDTO';
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
export class ReservationService {

  constructor(
    private http: HttpClient
  ) {

  }


  issueReservation(reservationDto: ReserveDTO): Observable<Array<any>> {
    console.log('$$$$$$$$----' + JSON.stringify(reservationDto));
    return this.http.post<Array<any>>('http://localhost:8803/api/airforce/reservation', reservationDto);
  }

  // toolHandOver(reserve: Array<ReserveDTO> = []): Observable<Array<any>> {
  //   console.log('Reserve Service = ' + JSON.stringify(reserve));
  //   return this.http.put<Array<any>>('', reserve, httpOptions);
  //   // return this.http.put<Array<any>>('http://localhost:8803/api/airforce/reservation', reserve, httpOptions);
  // }

  toolHandOver(reserve: ReserveDTO): Observable<Array<any>> {
    console.log('Reserve Service reserve  = ' + JSON.stringify(reserve));
    console.log('Reserve Service = ' + JSON.stringify(reserve.id));
    console.log('Reserve Service = ' + JSON.stringify(reserve.reserveDetailsDTOS[0].status));
    console.log('Reserve Service = ' + JSON.stringify(reserve.reserveDetailsDTOS[0].isEnable));
    // alert('Reserve Time :- ' + reserve.handOverTime);
    // return this.http.put<Array<any>>('', reserve, httpOptions);
    return this.http.put<Array<any>>('http://localhost:8803/api/airforce/reservation', reserve);
  }

  searchReservationIdList(id: number): Observable<Array<ReserveDTO>> {
    console.log('id :' + id);
    // return this.http.get<ReserveDTO>('http://localhost:8803/api/airforce/reservation' + '/' + id, httpOptions);
    // return this.http.get<ReserveDTO>('http://localhost:8803/api/airforce/reservation/froReserve?id=1&status=AVALIBLE', httpOptions);
    return this.http.get<Array<ReserveDTO>>('http://localhost:8803/api/airforce/reservation/froReserve' + '?id=' + id);
  }

  searchReservatin(id: number): Observable<ReserveDTO> {
    console.log('id :' + id);
    return this.http.get<ReserveDTO>('http://localhost:8803/api/airforce/reservation' + '/' + id);
  }

  searchReservationId(id: number): Observable<Array<ReserveDTO>> {
    console.log('id :' + id);
    return this.http.get<Array<ReserveDTO>>('http://5.189.148.181:8080/tool-management/api/airforce/reservation/getTechnician' + '/' + id);
  }

  searchReservation(text: string, count: number, page: number): Observable<Array<ReserveDTO>> {
    console.log('text :' + text);
    console.log('count :' + count);
    console.log('page :' + page);
    return this.http.get<Array<ReserveDTO>>('http://5.189.148.181:8080/tool-management/api/airforce/reservation' + '?text=' + text + '&count=' + count + '&page=' + page);
  }

}
