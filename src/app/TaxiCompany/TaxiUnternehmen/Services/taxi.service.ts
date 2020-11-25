import { Injectable } from '@angular/core';
import { Taxi } from './taxi';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TaxiService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addTaxi(taxi: Taxi): Observable<any> {
    return this.http.post<Taxi>('http://localhost:3000/api/create-taxi', taxi, this.httpOptions)
      .pipe(
        catchError(this.handleError<Taxi>('Add Taxi'))
      );
  }

  getTaxi(id): Observable<Taxi[]> {
    return this.http.get<Taxi[]>('http://localhost:3000/api/get-taxi/' + id)
      .pipe(
        tap(_ => console.log(`Song fetched: ${id}`)),
        catchError(this.handleError<Taxi[]>(`Get Taxi id=${id}`))
      );
  }

  getTaxiList(): Observable<Taxi[]> {
    return this.http.get<Taxi[]>('http://localhost:3000/api/get-taxis')
      .pipe(
        tap(taxis => console.log('Taxis fetched!')),
        catchError(this.handleError<Taxi[]>('Get Taxis', []))
      );
  }

  updateTaxi(id, taxi: Taxi): Observable<any> {
    return this.http.put('http://localhost:3000/api/update-taxi/' + id, taxi, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Taxi updated: ${id}`)),
        catchError(this.handleError<Taxi[]>('Update Taxi'))
      );
  }

  deleteTaxi(id): Observable<Taxi[]> {
    return this.http.delete<Taxi[]>('http://localhost:3000/api/delete-taxi/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Taxi deleted: ${id}`)),
        catchError(this.handleError<Taxi[]>('Delete Taxi'))
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
