import { ActivatedRoute, Router } from '@angular/router';
// blog-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CoreService } from 'src/app/services/core.service';
import { IBlog } from 'src/app/models/blog.interface';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
})
export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;
  isEditMode = false;
  blogId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: CoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      author: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode by looking for a blog ID in the route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.blogId = +id; // Convert string to number
        this.loadBlogForEdit(this.blogId); // Load blog for editing
      }
    });
  }

  loadBlogForEdit(id: number): void {
    // Fetch the blog by ID and populate the form
    this.blogService.getBlogById(id).subscribe((blog: IBlog | undefined) => {
      if (blog) {
        this.blogForm.patchValue({
          title: blog.title,
          content: blog.content,
          author: blog.author
        });
      }
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const blog: IBlog = this.blogForm.value;

      if (this.isEditMode && this.blogId) {
        this.blogService.updateBlog(this.blogId, blog).subscribe(() => {
          this.router.navigate(['/blogs']);
        });
      } else {
        this.blogService.createBlog(blog).subscribe(() => {
          this.router.navigate(['/blogs']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/blogs']);  // Navigate back to the blog list page
  }
}
