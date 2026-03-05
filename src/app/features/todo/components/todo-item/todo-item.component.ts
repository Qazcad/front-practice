import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() task!: Task;

  @Output() completeID = new EventEmitter<number>();
  @Output() deleteID = new EventEmitter<number>();

  onCompleted() {
    this.completeID.emit(this.task.id);
  }

  onDelete() {
    this.deleteID.emit(this.task.id);
  }

}
