import { Component, numberAttribute } from '@angular/core';
import {  Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { Employee } from '../employee/employee';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'my-router',
  templateUrl: './logoutpage.component.html',
  styles: ``

})
export class LogoutpageComponent implements OnInit{
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  private router = inject(Router);
  counter: number = 0;
  msg: string;
  employees$?: Observable<Employee[]>;
  employee?: Employee;
  constructor(private builder: FormBuilder, public employeeService: EmployeeService) {
    this.employee = {
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
  this.loginForm = new FormGroup({
    password: this.password,
    email: this.email,
  });





  } // constructor
  ngOnInit(): void {
    // console.log(sessionStorage.getItem("login"))

    //this.msg = `${} `
    if(sessionStorage.getItem("login")){
      // console.log(sessionStorage.getItem("login"))
      this.employee = JSON.parse(sessionStorage.getItem("login")|| '{}')[0]
      console.log(this.employee)
      this.msg = `Welcome to ${this.employee?.company}'s page!`
      console.log(this.msg)
    }
    else{
      this.router.navigate(['/']);
    }


  }
  LogoutFunction(): void{
    sessionStorage.setItem("login", "")
    this.router.navigate(['/']);
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



}
