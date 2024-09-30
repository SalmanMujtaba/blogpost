import { ActivatedRoute, Router } from '@angular/router';
// blog-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CoreService } from 'src/app/services/core.service';

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
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.blogId = +id;
        this.blogService.getBlogById(this.blogId).subscribe(blog => {
          this.blogForm.patchValue(blog);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      if (this.isEditMode) {
        this.blogService.updateBlog(this.blogId!, this.blogForm.value).subscribe(() => {
          this.router.navigate(['/blogs']);
        });
      } else {
        this.blogService.createBlog(this.blogForm.value).subscribe(() => {
          this.router.navigate(['/blogs']);
        });
      }
    }
  }
}
