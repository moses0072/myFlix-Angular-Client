import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://mytopfilms.herokuapp.com/';

//User Registration
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient, private router: Router) { }
  
  userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }



  //User Login
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
//Get one movie  
  getMovieByTitle(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Get director
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Get genre
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  //Get user info
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), 
      catchError(this.handleError));
  }

  

  //Add user favorite movie
  addFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${user}/Movies/${id}`, id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //Delete user favorite movies
  removeFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}/Movies/${id}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  

  //Edit user info
  EditUserInfo(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${user}`, userDetails,  {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //Delete user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('item');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse): any{
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
  }
  return throwError(
    'Something bad happened');
  }
}