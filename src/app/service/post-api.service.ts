import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPost, Post } from '../model/post.model';
import { User } from '../model/user.model';
const API_BASE = 'https://jsonplaceholder.typicode.com';
@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${API_BASE}/posts`);
  }
  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${API_BASE}/posts?userId=${userId}`);
  }
  deletePost(id: number) {
    return this.http.delete(`${API_BASE}/posts/${id}`);
  }
  editPost(id: number, post: Post) {
    return this.http.patch(`${API_BASE}/posts/${id}`, post);
  }
  addPost(post: NewPost) {
    return this.http.post(`${API_BASE}/posts`, post);
  }
}
