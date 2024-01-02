import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { take } from 'rxjs';
import { CourseDetailsType } from '../../models/course-details.type';
import { CourseStatusEnums } from '../../enums/course-status.enums';
import { InstructorsType } from '../../models/instructors.type';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
})
export class CourseDetailsComponent implements OnInit {
  courseId: number;
  course: CourseDetailsType;
  instructors: InstructorsType[];
  courseStatus = [CourseStatusEnums.draft, CourseStatusEnums.published];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  defaultInstructor: InstructorsType = {name: '', image: ''};
  courseForm = this.fb.group({
    name: [''],
    status: [''],
    instructors: [[this.defaultInstructor]]
  });

  constructor(
    public activeRoute: ActivatedRoute,
    public coursesService: CoursesService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder,
    ) {
  }

  ngOnInit(){
    this.courseId = this.activeRoute.snapshot.params['id'];
    if (this.courseId && !isNaN(this.courseId)) {
      this.coursesService.getCourse(this.courseId).pipe(take(1)).subscribe( course => {
        this.course = course;
        this.instructors = course.instructors;
        this._initForm(this.course);
        this.changeDetectorRef.markForCheck();
      } );
    } else {
      this.router.navigate(['page-not-found']);
    }

  }

  private _initForm(course: CourseDetailsType) {
    this.courseForm.patchValue({
        name: course.name,
        status: course.status,
        instructors: course.instructors
    });
      this.courseForm.disable();
  }

  public trackBy(index: number, item: InstructorsType): string {
    return item.name;
  }

  back() {
    this.router.navigate(['courses']);
  }

  remove(instructor: InstructorsType): void {
    //ToDo implement when creating an edit mode
  }

  edit(instructor: InstructorsType, event: MatChipEditedEvent): void {
    //ToDo implement when creating an edit mode
  }

  add(event: MatChipInputEvent): void {
    //ToDo implement when creating an edit mode
  }
}
