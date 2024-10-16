import { Component } from '@angular/core';
import { StudentGridComponent } from '../student-grid/student-grid.component';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Student } from 'src/app/enums/student.enum';
import { StudentService } from 'src/app/services/student.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { MonitorComponent } from '../monitor/monitor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    StudentGridComponent,
    StudentDetailsComponent,
    MonitorComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private studentService: StudentService) { }

  private filterSubject = new BehaviorSubject<string>('');
  filterText$ = this.filterSubject.pipe(
    debounceTime(1000),
    distinctUntilChanged()
  );

  ngOnInit() {

  }

  onFilterChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }

  addStudent(): void {
    this.studentService.addStudent();
  }
  removeStudent(): void {
    this.studentService.removeSelectedStudent();
  }

}
