import { Component, inject, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback/feedback.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../employee/employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-logoutpage',
  templateUrl: './logoutpage.component.html',
  // styleUrls: ['./logoutpage.component.scss'],
})
export class LogoutpageComponent implements OnInit {
  feedbacks: any[] = [];
  msg: string = '';

  Form: FormGroup;
  title: FormControl;
  firstlast: FormControl;
  email: FormControl;
  password: FormControl;
  private router = inject(Router);
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  employees: Array<Employee> = [];
  createEmployee: boolean = false;
  employee_d: Employee;
  employee_new: Employee;
  employee?: Employee;

  constructor(private feedbackService: FeedbackService, private builder: FormBuilder, public employeeService: EmployeeService) {
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

    this.employee_d = {
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
  }

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




    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe({
      next: (feedbacks) => {
        this.feedbacks = feedbacks;
      },
      error: (err) => {
        console.error('Error loading feedbacks:', err);
        this.msg = 'Failed to load feedbacks. Please try again later.';
      },
    });
  }

  GetEmployeesList(): Employee[] {
    return this.employees.filter((emp) => emp.firstlast !== this.employee?.firstlast);
  }

  startNewEmployee(): void {
    this.createEmployee = true;
    this.employee_new = { ...this.employee_d };
  }

  updateNewEmployeeForm(): void {
    if (this.Form.valid) {
      this.employee_new.title = this.Form.get('title')?.value;
      this.employee_new.firstlast = this.Form.get('firstlast')?.value;
      this.employee_new.email = this.Form.get('email')?.value;
      this.employee_new.password = this.Form.get('password')?.value;
      this.createEmployee = false;
      this.msg = `Employee ${this.employee_new.firstlast} created successfully!`;
    }
  }
}
