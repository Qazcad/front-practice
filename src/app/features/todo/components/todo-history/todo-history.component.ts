import {Component, computed, Input } from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-todo-history',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './todo-history.component.html',
  styleUrl: './todo-history.component.css',
})
export class TodoHistoryComponent {

  @Input() todoService!: TodoService;

  readonly history = computed(() => {
    console.log(this.todoService.historyEntries())
    return this.todoService.historyEntries()
  })

  readonly historyNumber = computed(() => {
    return this.todoService.recentActivityCount()
  })

}
