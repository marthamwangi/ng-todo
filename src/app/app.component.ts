import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  errorMessage: any;
  sub!: Subscription | undefined

  constructor(private taskService: TaskService) {
  }
  title = 'todo';
  filter: 'all' | 'active' | 'done' = 'all';
  allTasks = this.taskService.getTasks();

  // get tasks() {
  //   if (this.filter === 'all') {
  //     return this.allTasks;
  //   }
  //   //filter(task => this.filter === 'done' ? task.done : !task.done)
  //   return filter((task: Task) => this.filter === 'done' ? task.done : !task.done)
  // }
  // addTask(description: string) {
  //   this.allTasks.unshift({
  //     description,
  //     done: false
  //   })
  // }
  // remove(task: { description: string; done: boolean; }) {
  //   this.allTasks.splice(this.allTasks.indexOf(task), 1)
  // }
  ngOnInit() {
    this.sub = this.taskService.getTasks().subscribe({
      next: tasks => {
        this.tasks = tasks;//emitted http is one parameter which is async and assigned taks
        filter((task: Task) => this.filter === 'done' ? task.done : !task.done);

      },
      error: err => this.errorMessage = err
    })
  }
  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
