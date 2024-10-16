import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, } from '@angular/material/paginator';
import { Student } from 'src/app/enums/student.enum';
import { StudentService } from 'src/app/services/student.service';
import { Observable, Subscription, of } from 'rxjs';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-student-grid',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './student-grid.component.html',
  styleUrls: ['./student-grid.component.scss']
})
export class StudentGridComponent {
  dataSource: any;
  displayedColumns: any[] = ['id', 'name', 'date', 'grade', 'subject'];
  selected_student!: Student | null;
  private subscriptions: Subscription[] = [];
  students_list!: Student[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private paginatorIntl: MatPaginatorIntl,
    private studentService: StudentService,
    private mainComponent: MainComponent) {
    // this.selected_student_id= this.studentService.selected_student;
    // this.paginatorIntl.itemsPerPageLabel = 'התחלה';
    // this.paginatorIntl.lastPageLabel = 'סוף';
    // this.paginatorIntl.itemsPerPageLabel = PagingEnum.ItemsPerPageLabel;
    // this.paginatorIntl.nextPageLabel = PagingEnum.NextPageLabel;
    // this.paginatorIntl.previousPageLabel = PagingEnum.PreviousPageLabel;
    // this.paginatorIntl.firstPageLabel = PagingEnum.FirstPageLabel;
    // this.paginatorIntl.lastPageLabel = PagingEnum.LastPageLabel;
    // this.paginatorIntl.getRangeLabel = this.utilitiesService.getRangeLabel.bind(this);
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.studentService.students$.subscribe(students => {
        this.students_list = students;
        this.dataSource.data = students;
      })
    );
    this.subscriptions.push(
      this.studentService.selectedStudent$.subscribe(student => {
        this.selected_student = student;

      })
    );
    this.subscriptions.push(
      this.mainComponent.filterText$.subscribe(filterText => {
        this.applyFilter(filterText);
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions.length) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSelect(row: any): void {
    this.studentService.updateSelectedStudent(row);
  }

  private applyFilter(filterText: string): Observable<any[]> {
    // If the filter is empty, return all data
    if (!filterText.trim()) {
      this.dataSource.data = this.students_list;
      return of(this.dataSource.data);
    }

    // Convert filterText to lowercase for case-insensitive comparison
    const filterValue = filterText.toLowerCase();

    // Filter the data
    if (filterText.includes('ID:')) {
      // let newStr = filterText.split('ID:');
      // if (newStr[1].length) {
      //   const filteredData = this.dataSource.data.filter((item: { id: { toString: () => string; }; }) =>
      //     item.id.toString().startsWith(newStr[1])
      //   );

      //   this.dataSource.data = filteredData;
      //   // Return an Observable of the filtered data
      //   return of(filteredData);
      // }
      let newStr = filterText.replace('ID:', '');
      if (newStr.length) {
        const filteredData = this.dataSource.data.filter((item: { id: { toString: () => string; }; }) =>
          item.id.toString().startsWith(newStr)
        );

        this.dataSource.data = filteredData;
        // Return an Observable of the filtered data
        return of(filteredData);
      }


    } else {
      if (filterText.includes('>')) {
        let newStr = filterText.replace('>', '');
        if (newStr.length) {
          const filteredData = this.dataSource.data.filter((item: { grade: number }) =>
            item.grade >= +newStr
          );

          this.dataSource.data = filteredData;
          // Return an Observable of the filtered data
          return of(filteredData);
        }
      }
    }

    return of(this.dataSource.data);




    // this.dataSource.filterPredicate = (data: any, filter: string) => {
    //   return data.name.toLowerCase().includes(filter) || data.subject.toLowerCase().includes(filter);
    // };
    // this.dataSource.data.filter((stu: { id: { toString: () => string; }; })=> stu.id.toString() == str);
    // const filterValue = (event.target as HTMLInputElement).value;

    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  // highlight(row: any): boolean {console.log('Row ID:', row.id, 'Selected ID:', this.studentService.selectedId$, 'Match:', row.id === this.selected_student_id);
  //   return row.id === this.selected_student_id;
  //   // 
  //   // return row.id === this.selected_student_id;
  // }
}
