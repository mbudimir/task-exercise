import { STATES } from './../../models/state';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  taskForm: FormGroup;
  states = STATES;
  selectedState: any;
  errorMsg = '';

  constructor(public _taskSvc: TaskService,
    private router: Router) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      name : new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      estimate: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required)
    });
  }

  async create() {
    const task = new Task();
    task.name = this.taskForm.value.name;
    task.description = this.taskForm.value.description;
    task.estimate = this.taskForm.value.estimate;
    task.state = this.taskForm.value.state.id;

    this._taskSvc.create(task).subscribe(resp => {
      this.router.navigate(['/task']);
    }, error => this.errorMsg = 'something was wrong, Verify and try again');
  }
}
