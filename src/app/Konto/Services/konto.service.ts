import { Injectable } from '@angular/core';
import { Voucher } from '../voucher';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KontoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  addVoucher(voucher: Voucher): Observable<any> {
    return this.http.post<Voucher>('http://localhost:3000/api/voucher', voucher, this.httpOptions)
      .pipe(
        catchError(this.handleError<Voucher>('Add Voucher'))
      );
  }

  getVoucherById(id): Observable<Voucher[]>{
   return this.http.get<Voucher[]>('http://localhost:3000/api/voucher/' + id)
   .pipe(
     tap(_ => console.log(`Voucher fetched: ${id}`)),
     catchError(this.handleError<Voucher[]>(`Get Voucher id=${id}`))
   ); 
 }

 updateVoucher(id, voucher: Voucher){
  return this.http.put('http://localhost:3000/api/voucher/' + id, voucher)
    .pipe(
      tap(_ => console.log(`Voucher updated: ${id}`)),
      catchError(this.handleError<Voucher[]>('Update Voucher'))
    );
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
