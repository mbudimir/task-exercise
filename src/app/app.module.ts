import { TaskService } from './services/task.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TaskListComponent } from './page/task-list/task-list.component';
import { TaskCreateComponent } from './page/task-create/task-create.component';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { TotalHoursComponent } from './page/total-hours/total-hours.component';

const routes: Routes = [
  {path: '', component: TaskListComponent},
  {path: 'task', component: TaskListComponent},
  {path: 'create', component: TaskCreateComponent},
  {path: '**', component: TaskListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskCreateComponent,
    TotalHoursComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
