import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  templateUrl: 'create-home.component.html',
  selector: 'my-router',
})
export class CreateHomeComponent implements OnInit {
  @Input() selectedEmployee: Employee = {
    id: 0,
    title: '',
    firstlast: '',
    company: '',
    email: '',
    password: '',
  };

  employees: Array<Employee> = [];
  tempcompanyemployees: Array<Employee> = [];
  tempemailemployees: Array<Employee> = [];
  newEmployee: Employee = {
    id: 0,
    title: '',
    firstlast: '',
    company: '',
    password: '',
    email: '',
  };

  msg: string = '';
  createForm: FormGroup;
  private router = inject(Router);
  email: FormControl;
  password: FormControl;
  firstlast: FormControl;
  company: FormControl;
  incorrect: boolean = false;

  constructor(
    public employeeService: EmployeeService,
    private builder: FormBuilder
  ) {
    this.email = new FormControl('', Validators.compose([Validators.required]));
    this.password = new FormControl('', Validators.compose([Validators.required]));
    this.firstlast = new FormControl('', Validators.compose([Validators.required]));
    this.company = new FormControl('', Validators.compose([Validators.required]));

    this.createForm = new FormGroup({
      email: this.email,
      firstlast: this.firstlast,
      company: this.company,
      password: this.password,
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('login', '');
    }

    this.createForm.patchValue({
      title: this.selectedEmployee.title,
      firstlast: this.selectedEmployee.firstlast,
      password: this.selectedEmployee.password,
      company: this.selectedEmployee.company,
      email: this.selectedEmployee.email,
    });

    this.employeeService.getAll().subscribe({
      next: (payload: any) => {
        this.employees = payload;
        console.log(this.employees[0]);
        this.msg = 'Account Creation';
      },
      error: (err: Error) => {
        this.msg = `Get failed! - ${err.message}`;
      },
      complete: () => {},
    });
  }

  CreateAccountFunction(): void {
    console.log(this.company.value);
    this.tempcompanyemployees = this.employees.filter(
      (item) => item.company.toLowerCase() === this.company.value.toLowerCase()
    );
    this.tempemailemployees = this.employees.filter(
      (item) => item.email.toLowerCase() === this.email.value.toLowerCase()
    );

    if (this.tempcompanyemployees.length > 0 || this.tempemailemployees.length > 0) {
      console.log('Taken');
      this.incorrect = true;
    } else {
      this.incorrect = false;
      this.newEmployee.title = 'Manager';
      this.newEmployee.company = this.company.value;
      this.newEmployee.email = this.email.value.toLowerCase();
      this.newEmployee.firstlast = this.firstlast.value;
      this.newEmployee.password = this.password.value;
      this.add(this.newEmployee);
      this.router.navigate(['/']);
    }
  }

  add(employee: Employee): void {
    employee.id = 0;
    this.employeeService.create(employee).subscribe({
      next: (emp: Employee) => {
        this.msg = `Employee ${emp.id} added!`;
      },
      error: (err: Error) => {
        this.msg = `Employee not added! - ${err.message}`;
      },
      complete: () => console.log('working'),
    });
  }
}
