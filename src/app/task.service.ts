import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks!: Task;
  private tasksUrl = '/assets/tasks.json'
  constructor(private http: HttpClient) {


  }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      //error handling if anything is wrong from serverside
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      )
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      //a client-side or network error occured. Handle it accordingly
      errorMessage = `An error occured: ${err.error.message}`
    } else {
      //unsuccessful response code
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage)
  }
}
