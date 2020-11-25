import { Injectable } from '@angular/core';
import { Taxiroute } from './taxiroute';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TaxirouteService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addTaxiroute(taxiroute: Taxiroute): Observable<any> {
    return this.http.post<Taxiroute>('http://localhost:3000/api/create-taxiroute', taxiroute, this.httpOptions)
      .pipe(
        catchError(this.handleError<Taxiroute>('Add Taxiroute'))
      );
  }

  getTaxirouteList(): Observable<Taxiroute[]> {
    return this.http.get<Taxiroute[]>('http://localhost:3000/api/get-taxiroutes')
      .pipe(
        tap(taxiroutes => console.log('Taxiroutes fetched!')),
        catchError(this.handleError<Taxiroute[]>('Get Taxiroutes', []))
      );
  }

  getTaxiroutesById(userID): Observable<Taxiroute[]> {
    return this.http.get<Taxiroute[]>('http://localhost:3000/api/get-taxiroutes/'+userID)
      .pipe(
        tap(taxiroutes => console.log('Taxiroutes fetched!')),
        catchError(this.handleError<Taxiroute[]>('Get Taxiroutes', []))
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