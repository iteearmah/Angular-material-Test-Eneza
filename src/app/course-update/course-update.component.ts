import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {
  courseID: number;
  nameFormControl = new FormControl('', [Validators.required]);
  courseForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
  });

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private route: ActivatedRoute, private courseService: CourseService, public snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseID = +params['id']; // (+) converts string 'id' to a number
      this.courseService.getCourse(this.courseID).subscribe((response) => {
          this.courseForm.setValue({
            name: response.data['name'],
          });
        },
        err => {
          console.log(err.message);
          this.openSnackBar(err.message);
        });
    });
  }

  updateCourse(): void {
    this.courseService.updateCourse(this.courseID,{'name': this.nameFormControl.value}).subscribe(res => {
        this.router.navigate(['/courses']);
        this.openSnackBar('Course updated successfully!');
      },
      err => {
        console.log(err.statusText);
        this.openSnackBar(err.statusText);
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
