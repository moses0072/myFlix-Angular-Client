import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
//import { Router } from '@angular/router';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://mytopfilms.herokuapp.com/';

//User Registration
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient) { }
  
  userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  //User Login
  userLogin(username: string, password:string): Observable<any> {
    console.log(username);
    console.log(password);
    return this.http.post(apiUrl + 'login', {
      Username: username,
      Password: password,
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
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
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {
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
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genre, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  //Get user info
  getUser(): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${user}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  }

  
  //Add user favorite movie
  addFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${user}/favorites/${movieID}`, movieID, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(catchError(this.handleError));
  }

  //Delete user favorite movies
  deleteFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}/favorites/${movieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        catchError(this.handleError)
      );
  }
  

  //Edit user info
  editUser(userDetails: any): Observable<any> {
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
    const token = localStorage.getItem('token');
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
  private extractResponseData(res: Object): any {
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