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
  userId = signal<number | null>(null); // nullable
  selectedPost = signal<Post | null>(null);

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['userId'] ? +params['userId'] : null;
      this.userId.set(id);
      this.fetchPosts(id);
    });
  }

  fetchPosts(userId?: number | null) {
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(data => {
        if (userId) {
          // Filter posts by userId
          this.posts.set(data.filter(p => p.userId === userId));
        } else {
          // Show all posts
          this.posts.set(data);
        }
      });
  }

  openPopup(post: Post) {
    this.selectedPost.set(post);
  }

  closePopup() {
    this.selectedPost.set(null);
  }
}
