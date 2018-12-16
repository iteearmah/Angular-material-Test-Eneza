import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course.model';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  API_URL = environment.apiUrl;
  reqHeader = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  });

  constructor(private  httpClient: HttpClient) {

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCourses(page: number): Observable<Course[]> {

    return this.httpClient.get<Course[]>(`${this.API_URL}/courses?page=${page}`, {headers: this.reqHeader}).pipe(
      tap(() => console.log('fetched courses')),
      catchError(this.handleError('getCourses', []))
    );
  }

  addCourse(course): Observable<Course> {
    return this.httpClient.post<Course>(`${this.API_URL}/courses/create`, course, {headers: this.reqHeader}).pipe(
      tap(() => console.log(`added course`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  getCourse(id: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API_URL}/courses/${id}`, {headers: this.reqHeader}).pipe(
      tap(() => console.log(`fetched course id=${id}`)),
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }

  updateCourse(id: number, course: object): Observable<Course> {
    return this.httpClient.put<Course>(`${this.API_URL}/courses/${id}`, course, {headers: this.reqHeader}).pipe(
      catchError(this.handleError<any>('updateCourse'))
    );


  }

  deleteCourse(id: number): Observable<Course> {
    return this.httpClient.delete<Course>(`${this.API_URL}/courses/${id}`, {headers: this.reqHeader}).pipe(
      tap(() => console.log(`deleted course id=${id}`)),
      catchError(this.handleError<any>('deleteCourse'))
    );
  }

}
