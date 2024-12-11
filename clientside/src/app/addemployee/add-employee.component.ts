import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employees: Array<{
    id: number;
    title: string;
    firstlast: string;
    company: string;
    password: string;
    email: string;
  }> = [];

  newEmployee = {
    title: '',
    firstlast: '',
    company: '',
    password: '',
    email: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.http.get('/api/employees').subscribe((data: any) => {
      this.employees = data;
    });
  }

  addEmployee(): void {
    this.http.post('/api/employees', this.newEmployee).subscribe((employee: any) => {
      this.employees.push(employee);
      this.newEmployee = { title: '', firstlast: '', company: '', password: '', email: '' };
    });
  }

  removeEmployee(id: number): void {
    this.http.delete(`/api/employees/${id}`).subscribe(() => {
      this.employees = this.employees.filter(employee => employee.id !== id);
    });
  }
}
