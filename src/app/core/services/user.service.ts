import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`https://reqres.in/api/users?page=1`)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<any>('getUsers', {data: []}))
      );
  }

  getUserDetails(id: number): Observable<any> {
    const url = `https://reqres.in/api/users/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<any>(`getUserDetails id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
