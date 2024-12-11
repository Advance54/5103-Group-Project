import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../employee/employee';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'my-router',
  templateUrl: './logoutpage.component.html',
  styles: ``
})
export class LogoutpageComponent implements OnInit {
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
}
