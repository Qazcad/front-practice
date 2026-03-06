import { Component } from '@angular/core';
import {TodoListComponent} from './features/todo/components/todo-list/todo-list.component';
import {TodoHistoryComponent} from './features/todo/components/todo-history/todo-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent, TodoHistoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
