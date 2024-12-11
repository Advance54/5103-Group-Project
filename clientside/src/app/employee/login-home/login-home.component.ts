import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
<<<<<<< HEAD
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
=======
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
<<<<<<< HEAD
  templateUrl: 'login-home.component.html',
  selector: 'my-router',
})

=======
 templateUrl: 'login-home.component.html',
 selector: 'my-router',
})
>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
export class LoginHomeComponent implements OnInit {
  @Input() selectedEmployee: Employee = {
    id: 0,
    title: '',
    firstlast: '',
    company: '',
    email: '',
    password: '',
<<<<<<< HEAD
  };
  employees: Array<Employee>;
  msg: string;
  loginForm: FormGroup;
  private router = inject(Router);
  email: FormControl;
  password: FormControl;
  incorrect: number;
  constructor(
    public employeeService: EmployeeService,
    private builder: FormBuilder
  ) {
    this.employees = [];
    this.msg = '';
    this.incorrect = 0;
    this.email = new FormControl('', Validators.compose([Validators.required]));
    this.password = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  } // constructor

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('login', '');
    }

    this.loginForm.patchValue({
      title: this.selectedEmployee.title,
      firstname: this.selectedEmployee.firstlast,
      lastname: this.selectedEmployee.password,
      phoneno: this.selectedEmployee.company,
      email: this.selectedEmployee.email,
    });

    this.employeeService.getAll().subscribe({
      // Observer object, complete method intrinscally unsubscribes
      next: (payload: any) => {
        this.employees = payload;
        console.log(this.employees);
        this.msg = 'Please Note that passwords are case sensitive';
      },
      error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
      complete: () => {},
    }); // subscribe
  } // ngOnInit
  
  LoginFunction(): void {
    if (
      this.employees.filter(
        (item) =>
          item.email.toLowerCase() == this.email.value.toLowerCase() &&
          item.password == this.password.value
      )[0] != null
    ) {
      console.log(true);
      sessionStorage.setItem(
        'login',
        JSON.stringify(
          this.employees.filter(
            (item) =>
              item.email.toLowerCase() == this.email.value.toLowerCase() &&
              item.password == this.password.value
          )
        )
      );

      this.router.navigate(['/employees']);
    } else {
      this.incorrect = 1;
      //console.log(this.incorrect)
    }
  }
  CreateFunction(): void {
    this.router.navigate(['/create']);
  }
=======
    };
 employees: Array<Employee>;
 msg: string;
 loginForm: FormGroup;
 private router = inject(Router);
 email: FormControl;
 password: FormControl;
  incorrect: number;
 constructor(public employeeService: EmployeeService, private builder: FormBuilder) {
 this.employees = [];
 this.msg = '';
 this.incorrect = 0;
 this.email = new FormControl('', Validators.compose([Validators.required]));
 this.password = new FormControl('', Validators.compose([Validators.required]));
 this.loginForm = new FormGroup({
  email: this.email,
  password: this.password,
 })
 } // constructor
 ngOnInit(): void {
  sessionStorage.setItem("login", "")

  this.loginForm.patchValue({
    title: this.selectedEmployee.title,
    firstname: this.selectedEmployee.firstlast,
    lastname: this.selectedEmployee.password,
    phoneno: this.selectedEmployee.company,
    email: this.selectedEmployee.email,
  })

 this.employeeService.getAll().subscribe({
 // Observer object, complete method intrinscally unsubscribes
 next: (payload: any) => {
 this.employees = payload;
console.log(this.employees)
 this.msg = 'Please Note that passwords are case sensitive';
 },
 error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
 complete: () => {},
 }); // subscribe
 } // ngOnInit
 LoginFunction(): void{
  if(this.employees.filter(item =>
    item.email.toLowerCase() == this.email.value.toLowerCase() && item.password == this.password.value)[0] != null){
      console.log(true)
      sessionStorage.setItem("login",JSON. stringify(this.employees.filter(item =>
        item.email.toLowerCase() == this.email.value.toLowerCase() && item.password == this.password.value )))

      this.router.navigate(['/employees']);
    }
    else{

      this.incorrect = 1;
      //console.log(this.incorrect)
    }

 }
 CreateFunction(): void{
  this.router.navigate(['/create']);
 }


>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
} // EmployeeHomeComponent
