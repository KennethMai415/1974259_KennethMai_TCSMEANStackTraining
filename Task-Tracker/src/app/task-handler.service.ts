import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskHandlerService {

  constructor(public http: HttpClient) { }

  storeTask(task: any) {
    if (task) {
      this.http.post("http://localhost:3000/tasks", task).subscribe();
    }
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>("/assets/tasks.json");
  }
}
