import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts = signal<Post[]>([]);
  userId = signal(0);
  selectedPost = signal<Post | null>(null);

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to query params
    this.route.queryParams.subscribe(params => {
      const id = +params['userId'] || 0;
      this.userId.set(id);
      this.fetchPosts(id); // Pass the userId
    });
  }

  fetchPosts(userId: number) {
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(data => {
        // Filter posts by userId
        this.posts.set(data.filter(p => p.userId === userId));
      });
  }

  openPopup(post: Post) {
    this.selectedPost.set(post);
  }

  closePopup() {
    this.selectedPost.set(null);
  }
}
