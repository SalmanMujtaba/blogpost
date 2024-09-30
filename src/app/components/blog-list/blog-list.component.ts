// blog-list.component.ts
import { Component, OnInit } from '@angular/core';

import { CoreService } from 'src/app/services/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent implements OnInit {
  blogs: any[] = [];

  constructor(private blogService: CoreService, private router: Router) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(data => {
      this.blogs = data;
    });
  }

  editBlog(id: number): void {
    this.router.navigate(['/edit-blog', id]);
  }
}
