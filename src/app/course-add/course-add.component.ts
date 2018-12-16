import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { SnackBarService } from '../services/snack-bar.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required]);
  courseForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
  });


  /*getNameErrorMessage(field) {
    return this.courseForm.get(field).hasError('required') ? 'You must enter a value' : '';
  }*/

  constructor(private courseService: CourseService, private router: Router, private snackBar: SnackBarService) {
  }

  ngOnInit() {
  }

  addNewCourse() {
    console.log(this.nameFormControl.value);
    this.courseService.addCourse({'name': this.nameFormControl.value}).subscribe(() => {
        this.router.navigate(['/courses']);
        this.snackBar.openSnackBar('Course add successfully!');
      },
      err => {
        console.log(err.message);
        this.openSnackBar(err.message);
      });
  }

}

