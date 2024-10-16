export interface Student {
    id: number,
    name: string,
    date: string,
    grade: number,
    subject: string,
    email: string,
    address: string,
    city: string,
    country: string,
    zip: number,
}

export interface Record {
    id: number,
    name: string,
    average: number,
    exams: number,
    totalGrade: number,    
}