import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable, observable } from 'rxjs';
import swal from 'sweetalert';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost:3000/task';
  constructor(private http: HttpClient) { 
  }

  create(task: Task) {
    return this.http.post(this.url, task).pipe(
    map((resp: any) => {
      swal('task created', task.name, 'success');
      return resp;
    }));
  }

  get() {
    return new Observable<Task[]>(obs => {
      this.http.get<Task[]>(this.url).subscribe(
        value => obs.next(value),
        e => obs.error(e)
        );
    });
  }

  getById(id: number) {
    return this.http.get(this.url + id);
  }

  update(task: Task) {
    const urlUpdate = `${this.url}/${task.id}`;
    return this.http.put(urlUpdate, task).pipe(
      map((resp: any) => {
        swal('task updated', task.name, 'success');
        return resp;
      }));
  }

  delete(id: number) {
    const urlDelete = `${this.url}/${id}`;
    return this.http.delete(urlDelete);
  }
}
