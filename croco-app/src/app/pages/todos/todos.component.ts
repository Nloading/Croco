import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed:boolean;
}
@Component({
  selector: 'app-todos',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todos = signal<Todo[]>([]);
  userId = signal(0);

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Use route param instead of queryParams
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // matches :id in route
      this.userId.set(id ? +id : 0);
      this.fetchTodos();
    });
  }

  fetchTodos() {
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe(data => this.todos.set(data.filter(t => t.userId === this.userId())));
  }
}