import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task'
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  editable = false;

  @Input()
  task!: Task;
  @Input()
  newTask!: string;
  @Output() remove = new EventEmitter<Task>();

  saveTask(description: string) {
    if (!description) return;
    this.editable = false;
    this.task.description = description;
  }
}
