import { Component } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, FilterType } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, NgForOf, NgIf, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  providers: [TodoService]
})
export class TodoListComponent {
  newTaskTitle: string = '';

  // Внедряем сервис через конструктор (Dependency Injection!)
  constructor(private todoService: TodoService) {}

  // Данные получаем из сервиса
  get filteredTasks() {
    return this.todoService.filteredTasks();
  }

  get remainingTasks() {
    return this.todoService.remainingCount();
  }

  get totalTasks() {
    return this.todoService.getTasks().length;
  }

  get currentFilter() {
    return this.todoService.getCurrentFilter();
  }

  addTask() {
    this.todoService.addTask(this.newTaskTitle);
    this.newTaskTitle = '';
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id);
  }

  completeTask(id: number) {
    this.todoService.completeTask(id);
  }

  setFilter(filter: FilterType) {
    this.todoService.setFilter(filter);
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }
}
