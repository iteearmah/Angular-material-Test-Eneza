import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';

import { Course } from '../models/course.model';
import { MatSnackBar, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  perPage: number;
  currentPage: number = 1;
  dataSource: Course[];
  totalCount: number;
  showSpinner: boolean;
  displayedColumns = ['id', 'name', 'actions'];


  constructor(private  courseService: CourseService, private router: Router, private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.loadData(1);
  }

  onPageSwitch(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.loadData(this.currentPage);
  }

  loadData(page: number) {
    this.showSpinner = true;
    this.courseService.getCourses(page)
      .subscribe((result: any) => {
          this.totalCount = result.meta.total;
          this.dataSource = result.data;
          this.perPage = result.meta.per_page;
          this.showSpinner = false;
        },
        err => {
          console.log(err.message);
          this.showSpinner = false;
        });
  }

  deleteCourse(id: number): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
          this.loadData(this.currentPage);
          this.snackBar.openSnackBar(`Course ${id} deleted successfully!`);
        },
        err => {
          console.log(err.message);
          this.showSpinner = false;
        });
    }

  }

}

