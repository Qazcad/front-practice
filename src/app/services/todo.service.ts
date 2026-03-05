import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

@Injectable()
export class TodoService {
  private tasks: Task[] = [
    { id: 1, title: 'Изучить Angular', completed: true },
    { id: 2, title: 'Написать код', completed: false },
    { id: 3, title: 'Выпить кофе', completed: false }
  ];

  private currentFilter: FilterType = 'all';

  // Геттеры для данных
  getTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(): Task[] {
    switch (this.currentFilter) {
      case 'active':
        return this.tasks.filter(task => !task.completed);
      case 'completed':
        return this.tasks.filter(task => task.completed);
      default:
        return this.tasks;
    }
  }

  getRemainingCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  getCompletedCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  getCurrentFilter(): FilterType {
    return this.currentFilter;
  }

  // Методы для управления задачами
  addTask(title: string): void {
    if (!title?.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false
    };

    this.tasks.push(newTask);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  completeTask(id: number): void {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = true;
    }
  }

  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter(task => !task.completed);
  }
}
