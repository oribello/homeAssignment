import { Record } from './../../enums/student.enum';
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/enums/student.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { __assign } from 'tslib';

@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent {
  dataSource: any;
  displayedColumns: any[] = ['id', 'name', 'average', 'exams'];
  // selected_student!: Student | null;
  private subscriptions: Subscription[] = [];
  students_list!: Student[];
  records!: { [key: string]: Record };
  recordsDataArray!: any;
  private filterSubject = new BehaviorSubject<string>('');
  filterText$ = this.filterSubject.pipe(
    debounceTime(1000),
    distinctUntilChanged()
  );

  @ViewChild('CBsuccess') private cbSuccess!: MatCheckbox;
  @ViewChild('CBfailed') private cbFailed!: MatCheckbox;
  constructor(
    private studentService: StudentService,
  ) {
    // this.dataSource = new MatTableDataSource<{[key: string]: Record }>([]);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.studentService.students$.subscribe(students => {
        this.students_list = students;
      })
    );

    this.records = this.calculateRecords(this.students_list);

    // this.subscriptions.push(
    //   this.studentService.selectedStudent$.subscribe(student => {
    //     this.selected_student = student;

    //   })
    // );

    // this.subscriptions.push(
    //   this.mainComponent.filterText$.subscribe(filterText => {
    //     this.applyFilter(filterText);
    //   })
    // );
  }

  ngAfterViewInit(): void {
    const recordsDataArray = Object.values(this.records).map(student => ({
      id: student.id,
      name: student.name,
      average: Number((student.totalGrade / student.exams).toFixed(2)),
      exams: student.exams
    }));
    this.recordsDataArray = recordsDataArray;
    // debugger
    // <Record[]>this.recordsDataArray = structuredClone(recordsDataArray) ;
    this.dataSource = new MatTableDataSource(recordsDataArray);
    this.dataSource.data = recordsDataArray
  }

  calculateRecords(data: Student[]): { [key: string]: Record } {
    const groupedData = data.reduce((acc, curr) => {
      const id = curr.id.toString();
      if (!acc[id]) {
        (<Record>acc[id]) = {
          id: curr.id,
          name: curr.name,
          average: 0,
          totalGrade: 0,
          exams: 0  
        };
      }
      acc[id].totalGrade += curr.grade;
      acc[id].exams += 1;
      return acc;
    }, {} as { [key: string]: Record & { totalGrade: number } });

    // Calculate averages and remove totalGrade
    Object.values(groupedData).forEach(student => {
      student.average = Number((student.totalGrade / student.exams).toFixed(2));
      // const updatedStudent: Omit<typeof student, 'totalGrade'> = {
      //   ...student,
      //   average: student.average
      // };
      // // Assign the updated student back to the original reference
      // student = Object.assign(student, updatedStudent);
    });

    return groupedData;
  }

  onCBChangeValue(e: any): void {
    const originalData = { ...this.records };

    if (this.cbSuccess.checked && this.cbFailed.checked){
      this.dataSource.data = this.recordsDataArray;
      return;
    }
        
    switch (true) {
      case (this.cbSuccess.checked):
        this.dataSource.data = Object.values(originalData).filter((record: { average: number; }) => record.average >= 65 ? true : false);
        break;
      case (this.cbFailed.checked):
        this.dataSource.data = Object.values(originalData).filter((record: { average: number; }) => record.average < 65 ? true : false);
        break;
      default:
        this.dataSource.data = this.recordsDataArray;
    }

    // if (this.cbSuccess.checked && this.cbFailed.checked) {
    //   this.dataSource.data = this.recordsDataArray;
    // } else {
    //   if (this.cbSuccess.checked) {
    //     this.dataSource.data = Object.values(originalData).filter((record: { average: number; }) => record.average >= 65 ? true : false);
    //   } else {
    //     this.dataSource.data = Object.values(originalData).filter((record: { average: number; }) => record.average < 65 ? true : false);
    //   }
    // } 


    /*
    if (e.checked) {
      // let temp: typeof this.records = structuredClone(this.records);
      // const temp: typeof this.records = JSON.parse(JSON.stringify(this.records));
      
      this.dataSource.data = Object.values(originalData).filter((record: { average: number; }) => record.average > 65 ? true : false);
    } else {
      debugger
      this.dataSource.data = this.recordsDataArray;
    }
    */
  }

  onFilterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }
}
