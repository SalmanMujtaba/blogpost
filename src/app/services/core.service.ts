import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { IBlog } from '../models/blog.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private apiUrl = '/assets/blogs.json'; // Path to your JSON file (this would typically be an API endpoint)

  constructor(private http: HttpClient) { }

  // Fetch all blogs
  getBlogs(): Observable<IBlog[]> {
    return this.http.get<IBlog[]>(this.apiUrl);
  }

  // Create a new blog post
  createBlog(blog: IBlog): Observable<IBlog> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    blog.timestamp = new Date().toISOString();  // Add timestamp when creating
    return this.http.post<IBlog>(this.apiUrl, blog, { headers });
  }

  // Update an existing blog post
  updateBlog(id: number, blog: IBlog): Observable<IBlog> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    blog.timestamp = new Date().toISOString();  // Update timestamp when editing
    return this.http.put<IBlog>(`${this.apiUrl}/${id}`, blog, { headers });
  }

  // Fetch a single blog by ID
  getBlogById(id: number): Observable<IBlog | undefined> {
    return this.getBlogs().pipe(
      map((blogs: IBlog[]) => blogs.find((blog: IBlog) => blog.id === id))
    );
  }
}
