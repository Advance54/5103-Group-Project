import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../employee/employee';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'my-router',
  templateUrl: './logoutpage.component.html',
  styles: ``
})
export class LogoutpageComponent implements OnInit {
  Form: FormGroup;
  title: FormControl;
  firstlast: FormControl;
  email: FormControl;
  password: FormControl;

  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  employees: Array<Employee>;
  createEmployee: boolean;
  employee_d: Employee;
  employee_new: Employee;

  private router = inject(Router);
  counter: number = 0;
  msg: string;
  employees$?: Observable<Employee[]>;
  employee?: Employee;

  constructor(private builder: FormBuilder, public employeeService: EmployeeService) {
    this.employees = [];
    this.createEmployee = false;
    this.employee = {
      id: 0,
      title: '',
      firstlast: '',
      company: '',
      password: '',
      email: '',
    };
    this.employee_new = {
      id: 0,
      title: '',
      firstlast: '',
      company: '',
      password: '',
      email: '',
    };
    this.employee_d = {
      id: 0,
      title: '',
      firstlast: '',
      company: '',
      password: '',
      email: '',
    };
    this.msg = '';

    this.title = new FormControl('', Validators.compose([Validators.required]));
    this.firstlast = new FormControl('', Validators.compose([Validators.required]));
    this.email = new FormControl('', Validators.compose([Validators.required, Validators.email]));
    this.password = new FormControl('', Validators.compose([Validators.required]));
    this.Form = this.builder.group({
      title: this.title,
      firstlast: this.firstlast,
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem("login"));
    if (sessionStorage.getItem("login")) {
      this.employee = JSON.parse(sessionStorage.getItem("login") || '{}')[0];
      console.log(this.employee);
      this.msg = `Welcome to ${this.employee?.company}'s page!`;
    } else {
      this.router.navigate(['/']);
    }

    this.employeeService.getAll().subscribe({
      next: (payload: any) => {
        this.employees = payload;
      },
      error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
      complete: () => {},
    });
  }

  LogoutFunction(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("login", "");
    }
    this.router.navigate(['/']);
  }

  startNewEmployee(): void {
    this.employee_new = Object.assign({}, this.employee_d);
    this.msg = 'New Employee';
    this.createEmployee = !this.createEmployee;
  }

  GetEmployeesList(): Employee[] {
    return this.employees.filter(loggedin => loggedin.firstlast !== this.employee?.firstlast);
  }

  updateNewEmployeeForm(): void {
    if (this.employee_new && this.employee) {
      this.employee_new.title = this.Form.getRawValue().title;
      this.employee_new.firstlast = this.Form.getRawValue().firstlast;
      this.employee_new.company = this.employee.company;
      this.employee_new.password = this.Form.getRawValue().password;
      this.employee_new.email = this.Form.getRawValue().email;
      this.add(this.employee_new);
    }

    setTimeout(() => {
      window.location.reload();
    }, 50);
  }

  add(emp: Employee): void {
    this.employeeService.create(emp).subscribe({
      next: (emp: Employee) => {
        this.msg = `Employee ${emp.firstlast} added!`;
        this.getAllEmps();
        this.createEmployee = !this.createEmployee;
      },
      error: (err: Error) => (this.msg = `Employee not added! - ${err.message}`),
    });
  }

  getAllEmps(): void {
    this.employeeService.getAll().subscribe({
      next: (emps: Employee[]) => { this.dataSource.data = emps },
      error: (e: Error) => this.msg = `Failed to load Employees - ${e.message}`,
    });
  }
}
