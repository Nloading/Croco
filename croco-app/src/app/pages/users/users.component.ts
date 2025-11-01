import { Component, computed, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: { name: string };
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users = signal<User[]>([]);
  searchTerm = signal('');

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => this.users.set(data));
  }

  // Computed signal for filtered users
  filteredUsers = computed(() =>
    this.users().filter(u =>
      u.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      u.username.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      u.email.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  search() {
    // triggers recomputation automatically
  }

  goToPosts(userId: number) {
    this.router.navigate(['/posts'], { queryParams: { userId } });
  }
}
