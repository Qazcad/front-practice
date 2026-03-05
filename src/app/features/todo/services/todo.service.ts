import { Injectable, signal, computed } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

@Injectable()
export class TodoService {
  private tasks = signal<Task[]>([
    { id: 1, title: 'Изучить Angular', completed: true },
    { id: 2, title: 'Написать код', completed: false },
    { id: 3, title: 'Выпить кофе', completed: false }
  ]);

  public currentFilter = signal<FilterType>('all');

  filteredTasks = computed(() => {
    switch (this.currentFilter()) {
      case 'active':
        return this.tasks().filter(task => !task.completed);
      case 'completed':
        return this.tasks().filter(task => task.completed);
      default:
        return this.tasks();
    }
  });

  remainingCount = computed(() =>
    this.tasks().filter(task => !task.completed).length
  );

  completedCount = computed(() =>
    this.tasks().filter(task => task.completed).length
  );

  // Геттеры для данных
  getTasks(): Task[] {
    return this.tasks();
  }

  // Методы для управления задачами
  addTask(title: string): void {
    if (!title?.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false
    };

    this.tasks.set([...this.tasks(), newTask]);
  }

  deleteTask(id: number): void {
    this.tasks.set(this.tasks().filter(task => task.id !== id));
  }

  completeTask(id: number): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  }

  setFilter(filter: FilterType): void {
    this.currentFilter.set(filter);
  }

  clearCompleted(): void {
    this.tasks.set(this.tasks().filter(task => !task.completed));
  }
}
