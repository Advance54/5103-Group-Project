<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
=======
import { Component, numberAttribute } from '@angular/core';
import {  Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
import { Observable } from 'rxjs';
import { Employee } from '../employee/employee';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
<<<<<<< HEAD
import { EmployeeService } from '../employee/employee.service';
=======
>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62

@Component({
  selector: 'my-router',
  templateUrl: './logoutpage.component.html',
  styles: ``
<<<<<<< HEAD
})
export class LogoutpageComponent implements OnInit {
=======

})
export class LogoutpageComponent implements OnInit{
>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  private router = inject(Router);
  counter: number = 0;
  msg: string;
  employees$?: Observable<Employee[]>;
  employee?: Employee;
<<<<<<< HEAD

=======
>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
  constructor(private builder: FormBuilder, public employeeService: EmployeeService) {
    this.employee = {
      id: 0,
      title: '',
      firstlast: '',
      company: '',
      password: '',
      email: '',
<<<<<<< HEAD
    };
    this.msg = '';

    this.email = new FormControl('', Validators.compose([Validators.required]));
    this.password = new FormControl('', Validators.compose([Validators.required]));
    this.loginForm = new FormGroup({
      password: this.password,
      email: this.email,
    });
  }

  ngOnInit(): void {
    // Verifica se `sessionStorage` está disponível
    if (typeof window !== 'undefined' && sessionStorage.getItem("login")) {
      this.employee = JSON.parse(sessionStorage.getItem("login") || '{}')[0];
      this.msg = `Welcome to ${this.employee?.company}'s page!`;
      console.log(this.msg);
    } else {
      this.router.navigate(['/']);
    }
  }

  LogoutFunction(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("login", "");
    }
    this.router.navigate(['/']);
  }
=======
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



>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
}
