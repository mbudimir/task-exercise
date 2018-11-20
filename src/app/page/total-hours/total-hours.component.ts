import { map, share } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-total-hours',
  templateUrl: './total-hours.component.html',
  styleUrls: ['./total-hours.component.css']
})
export class TotalHoursComponent implements OnInit {
  @Input() planned: number;
  @Input() inProgress: number;
  @Input() complete: number;
  total: Task[];
  constructor() {
   }
  ngOnInit() {
  }
}
