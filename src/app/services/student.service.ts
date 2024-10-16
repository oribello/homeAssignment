import { Injectable } from '@angular/core';
import { Student } from '../enums/student.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  public student_list: Student[] = [
    { id: 111111, name: 'John Doe', date: '2023-05-01', grade: 80, subject: 'Math', email: 'john.doe@email.com', address: '123 Main St', city: 'New York', country: 'USA', zip: 10001 },
    { id: 111111, name: 'John Doe', date: '2023-05-10', grade: 65, subject: 'Computer Science', email: 'john.doe@email.com', address: '123 Main St', city: 'New York', country: 'USA', zip: 10001 },
    { id: 111111, name: 'John Doe', date: '2023-05-19', grade: 88, subject: 'Chemistry', email: 'john.doe@email.com', address: '123 Main St', city: 'New York', country: 'USA', zip: 10001 },
    { id: 111111, name: 'John Doe', date: '2023-05-28', grade: 58, subject: 'Physics', email: 'john.doe@email.com', address: '123 Main St', city: 'New York', country: 'USA', zip: 10001 },

    { id: 333333, name: 'Mike Johnson', date: '2023-05-03', grade: 79, subject: 'Math', email: 'mike.johnson@email.com', address: '789 Oak Ave', city: 'Chicago', country: 'USA', zip: 60601 },
    { id: 333333, name: 'Mike Johnson', date: '2023-05-12', grade: 45, subject: 'Physics', email: 'mike.johnson@email.com', address: '789 Oak Ave', city: 'Chicago', country: 'USA', zip: 60601 },
    { id: 333333, name: 'Mike Johnson', date: '2023-05-21', grade: 14, subject: 'Computer Science', email: 'mike.johnson@email.com', address: '789 Oak Ave', city: 'Chicago', country: 'USA', zip: 60601 },
    { id: 333333, name: 'Mike Johnson', date: '2023-05-30', grade: 82, subject: 'Chemistry', email: 'mike.johnson@email.com', address: '789 Oak Ave', city: 'Chicago', country: 'USA', zip: 60601 },

    { id: 555555, name: 'Alex Lee', date: '2023-05-05', grade: 60, subject: 'Physics', email: 'alex.lee@email.com', address: '654 Maple Dr', city: 'Phoenix', country: 'USA', zip: 85001 },
    { id: 555555, name: 'Alex Lee', date: '2023-05-14', grade: 83, subject: 'Chemistry', email: 'alex.lee@email.com', address: '654 Maple Dr', city: 'Phoenix', country: 'USA', zip: 85001 },
    { id: 555555, name: 'Alex Lee', date: '2023-05-23', grade: 77, subject: 'Math', email: 'alex.lee@email.com', address: '654 Maple Dr', city: 'Phoenix', country: 'USA', zip: 85001 },
    { id: 555555, name: 'Alex Lee', date: '2023-06-01', grade: 91, subject: 'Computer Science', email: 'alex.lee@email.com', address: '654 Maple Dr', city: 'Phoenix', country: 'USA', zip: 85001 },

    { id: 777777, name: 'Tom Taylor', date: '2023-05-07', grade: 100, subject: 'Physics', email: 'tom.taylor@email.com', address: '246 Birch Blvd', city: 'San Antonio', country: 'USA', zip: 78201 },
    { id: 777777, name: 'Tom Taylor', date: '2023-05-16', grade: 55, subject: 'Computer Science', email: 'tom.taylor@email.com', address: '246 Birch Blvd', city: 'San Antonio', country: 'USA', zip: 78201 },
    { id: 777777, name: 'Tom Taylor', date: '2023-05-25', grade: 86, subject: 'Math', email: 'tom.taylor@email.com', address: '246 Birch Blvd', city: 'San Antonio', country: 'USA', zip: 78201 },
    { id: 777777, name: 'Tom Taylor', date: '2023-06-03', grade: 72, subject: 'Chemistry', email: 'tom.taylor@email.com', address: '246 Birch Blvd', city: 'San Antonio', country: 'USA', zip: 78201 },

    { id: 999999, name: 'David Martinez', date: '2023-05-09', grade: 90, subject: 'Computer Science', email: 'david.martinez@email.com', address: '864 Willow Way', city: 'Dallas', country: 'USA', zip: 75201 },
    { id: 999999, name: 'David Martinez', date: '2023-05-18', grade: 22, subject: 'Physics', email: 'david.martinez@email.com', address: '864 Willow Way', city: 'Dallas', country: 'USA', zip: 75201 },
    { id: 999999, name: 'David Martinez', date: '2023-05-27', grade: 93, subject: 'Chemistry', email: 'david.martinez@email.com', address: '864 Willow Way', city: 'Dallas', country: 'USA', zip: 75201 },
    { id: 999999, name: 'David Martinez', date: '2023-06-05', grade: 48, subject: 'Math', email: 'david.martinez@email.com', address: '864 Willow Way', city: 'Dallas', country: 'USA', zip: 75201 }
  ];

  private studentsSubject = new BehaviorSubject<Student[]>(this.student_list);
  students$ = this.studentsSubject.asObservable();

  private selectedStudentSubject = new BehaviorSubject<Student | null>(null);
  selectedStudent$ = this.selectedStudentSubject.asObservable();

  updateSelectedStudent(stu: Student) {
    this.selectedStudentSubject.next(stu);
  }

  public getStudentList(): Student[] {
    return this.student_list;
  }

  addStudent() {
    let newStudent = { id: this.student_list.length + 1, name: 'Ori Bello', date: '2023-05-09', grade: 100, subject: 'Quilling', email: 'ori.bello@email.com', address: 'Dragot 300', city: 'Kfar Sava', country: 'USA', zip: 75201 }
    this.studentsSubject.value.push(newStudent);
    this.studentsSubject.next(this.studentsSubject.value);
  }

  removeSelectedStudent() {
    const currentStudents = this.studentsSubject.value;
    const selectedStudent = this.selectedStudentSubject.value;

    if (selectedStudent) {
      const updatedStudents = currentStudents.filter(student => student.id !== selectedStudent.id);
      this.studentsSubject.next(updatedStudents);
      this.selectedStudentSubject.next(null); // Clear the selection after removal
    }
  }
}
