import { Task } from 'src/app/models/task';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { STATES } from 'src/app/models/state';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskList: Task[];
  selectedTask: Task;
  states = STATES;
  selectedState: any;
  completeVar = 0;
  plannedVar = 0;
  inProgressVar = 0;
  errorMsg = '';
  constructor(public _taskSvc: TaskService,
    private modalService: NgbModal) {

   }

  ngOnInit() {
    this.load();
  }

  load() {
    this._taskSvc.get()
    .subscribe(resp => {
       this.taskList = resp;
       this.updateData();
    }, error => this.errorMsg = 'something was wrong');
  }

  updateData() {
    this.plannedVar = 0;
    this.inProgressVar = 0;
    this.completeVar = 0;
    this.taskList.forEach((item) => {
      switch (item.state) {
        case 1:
          this.plannedVar += item.estimate;
          break;
        case 2:
          this.inProgressVar += item.estimate;
          break;
        case 3:
          this.completeVar += item.estimate;
          break;
      }
    });
  }

  open(content: any, task: Task) {
    this.selectedTask = task;
    this.modalService.open(content,
       {ariaLabelledBy: 'modal-basic-title'});
  }

  edit() {
    this.selectedTask.state = this.selectedState.id;
    this._taskSvc.update(this.selectedTask)
    .subscribe(resp => {
      this.load();
      swal('Task update', 'Task state', 'success');
      this.modalService.dismissAll();
   }, error => this.errorMsg = 'something was wrong');

  }

  delete(task: Task) {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete the" + task.name +"task?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        this._taskSvc.delete(task.id)
        .subscribe(resp => {
          this.load();
          swal('task deleted', 'Task', 'success');
       }, error => this.errorMsg = 'something was wrong');
      }
    });
  }
}
