import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  baseHref: string;
  constructor(private http: HttpClient) {
    this.baseHref = 'https://reqres.in/api/users';
  }

  getUsers(page: number): Observable<any> {
    return this.http.get<any>(`${this.baseHref}?page=${page}`)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<any>('getUsers', {data: []}))
      );
  }

  getUserDetails(id: number): Observable<any> {
    const url = `${this.baseHref}/${id}`;
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
