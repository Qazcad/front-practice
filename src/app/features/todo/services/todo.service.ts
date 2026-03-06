import { Injectable, signal, computed } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface HistoryEntry {
  id: number;
  action: 'add' | 'delete' | 'complete' | 'clear';
  taskTitle: string | string[];
  timestamp: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

@Injectable()
export class TodoService {
  private tasks = signal<Task[]>([
    { id: 1, title: 'Изучить Angular', completed: true },
    { id: 2, title: 'Написать код', completed: false },
    { id: 3, title: 'Выпить кофе', completed: false }
  ]);

  private history = signal<HistoryEntry[]>([]);

  // Для чтения истории из компонента
  readonly historyEntries = this.history.asReadonly();

  readonly recentActivityCount = computed(() => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return this.history().filter(entry => entry.timestamp > fiveMinutesAgo).length;
  });

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

  private addHistoryEntry(action: HistoryEntry['action'], taskTitle: string | string[]) {
    const entry: HistoryEntry = {
      id: Date.now() + Math.random(), // уникальный id
      action,
      taskTitle,
      timestamp: new Date()
    };

    this.history.update(entries => [entry, ...entries]); // новые сверху
  }

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
    this.addHistoryEntry('add', newTask.title);
  }

  deleteTask(id: number): void {
    const deletedTask = this.tasks().filter(task => task.id === id).map(task => task.title);
    this.addHistoryEntry('delete', deletedTask[0]);
    this.tasks.set(this.tasks().filter(task => task.id !== id));
  }

  completeTask(id: number): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
    const completedTask = this.tasks().filter(task => task.id === id).map(task => task.title);
    this.addHistoryEntry('complete', completedTask[0]);
  }

  setFilter(filter: FilterType): void {
    this.currentFilter.set(filter);
  }

  clearCompleted(): void {
    const clearedTasks = this.tasks().filter(task => task.completed).map(task => task.title);
    this.addHistoryEntry('delete', clearedTasks);
    this.tasks.set(this.tasks().filter(task => !task.completed));
  }
}
