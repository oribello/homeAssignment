import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/enums/student.enum';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {
  private subscription!: Subscription;
  // selected_student!: Student | null;
  student!: Student | null;
  stu_list!: Student[];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.subscription = this.studentService.selectedStudent$.subscribe(stu => {
      const selected_student: Student | null = stu;
// debugger
      // this.selected_student = id;
      // if (this.selected_student) {
        
        if (selected_student){
          const stuId = this.findStudentIndex1(selected_student);
          this.student = this.stu_list[stuId];
        }
        
      // } else {
      //   this.student = null;
      // }
    });
  }

  findStudentIndex1(stu: Student): number {
    return this.stu_list.findIndex(element => 
      JSON.stringify(element) === JSON.stringify(stu)
    );
  }


}


