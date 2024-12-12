import { Component, numberAttribute } from '@angular/core';
import {  Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { Employee } from '../employee/employee';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'my-router',
  templateUrl: './logoutpage.component.html',
  styles: ``

})
export class LogoutpageComponent implements OnInit{
  Form: FormGroup;
  title: FormControl;
  firstlast: FormControl;

  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  email: FormControl;
  password: FormControl;
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

  this.email = new FormControl('', Validators.compose([Validators.required]));
  this.password = new FormControl('', Validators.compose([Validators.required]));
  this.title = new FormControl('', Validators.compose([Validators.required]));
  this.firstlast = new FormControl('', Validators.compose([Validators.required]));
  this.Form = new FormGroup({
    password: this.password,
    email: this.email,
    title: this.password,
    firstlast: this.email,
  });





  } // constructor
  ngOnInit(): void {
    console.log(sessionStorage.getItem("login"))

    //this.msg = `${} `
    if(sessionStorage.getItem("login")){
      // console.log(sessionStorage.getItem("login"))
      this.employee = JSON.parse(sessionStorage.getItem("login")|| '{}')[0]
      console.log(this.employee)
      this.msg = `Welcome to ${this.employee?.company}'s page!`
      //console.log(this.msg)
    }
    else{
      this.router.navigate(['/']);
    }

    this.employeeService.getAll().subscribe({
      // Observer object, complete method intrinscally unsubscribes
      next: (payload: any) => {
      this.employees = payload;
     //console.log(this.employees)

      },
      error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
      complete: () => {},
      }); // subscribe


  }
  LogoutFunction(): void{
    sessionStorage.setItem("login", "")
    this.router.navigate(['/']);
  }
  startNewEmployee(): void {
    this.employee_new = Object.assign({}, this.employee_d);
    this.msg = 'New Employee';
    this.createEmployee = !this.createEmployee
    }
  GetEmployeesList():Employee[]{
    //console.log(this.employees.filter(loggedin =>  loggedin.firstlast !== this.employee?.firstlast))
    return this.employees.filter(loggedin =>  loggedin.firstlast !== this.employee?.firstlast);

  }
  // ngOnInit(): void {
  //   this.msg = `Loading...`;
  //   this.getAll();
  //   ;
  // } // ngOnInit
  //   getAll(): void {
  //     this.employees$ = this.employeeService.getAll();

  //     this.employees$.subscribe({
  //     error: (e: Error) => console.log(`Couldn't get employees - ${e.message}`),
  //     complete: () => console.log(`Employees loaded!`),
  //     });
  //     this.employees$.forEach((element) => console.log(element.at(0)));
  //     } // getAll
  updateNewEmployeeForm(): void {
    if(this.employee_new && this.employee){
      this.employee_new.title = this.Form.getRawValue().title;
      this.employee_new.firstlast = this.Form.getRawValue().firstlast;
      this.employee_new.company = this.employee.company
      this.employee_new.password = this.Form.getRawValue().password;
      this.employee_new.email = this.Form.getRawValue().email;
      this.add(this.employee_new)
      // location.reload();
    }

    setTimeout(() => {
      window.location.reload();
  }, 50);


  //window.location.reload();
  }
  add(emp: Employee): void {

  this.employeeService.create(emp).subscribe({
  // Create observer object
  next: (emp: Employee) => {
  this.msg = `Employee ${emp.firstlast} added!`;
  this.getAllEmps();
  this.createEmployee = !this.createEmployee
  },
  error: (err: Error) =>
  (this.msg = `Employee not added! - ${err.message}`),

  });
  //window.location.reload();
  } // add
  getAllEmps(): void {
    this.employeeService.getAll().subscribe({
    next: (emps: Employee[]) => {this.dataSource.data = emps},
    error: (e: Error) => this.msg = `Failed to load Employees - ${e.message}`,

    });
    }

}
