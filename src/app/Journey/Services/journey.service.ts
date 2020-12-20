import { Injectable } from '@angular/core';
import { Journey } from '../journey';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JourneyService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addJourney(journey: Journey): Observable<any> {
    return this.http.post<Journey>('http://localhost:3000/api/create-journey', journey, this.httpOptions)
      .pipe(
        catchError(this.handleError<Journey>('Add Journey'))
      );
  }

  getJourneyList(): Observable<Journey[]> {
    return this.http.get<Journey[]>('http://localhost:3000/api/get-journeys')
      .pipe(
        tap(journeys => console.log('Journeys fetched!')),
        catchError(this.handleError<Journey[]>('Get Journeys', []))
      );
  }

  getJourneysById(userID): Observable<Journey[]> {
    return this.http.get<Journey[]>('http://localhost:3000/api/get-journeys/'+userID)
      .pipe(
        tap(journeys => console.log('Journeys fetched!')),
        catchError(this.handleError<Journey[]>('Get Journeys', []))
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