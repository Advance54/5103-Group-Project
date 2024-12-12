import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback/feedback.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../employee/employee';

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

  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  employees: Array<Employee> = [];
  createEmployee: boolean = false;
  employee_d: Employee;
  employee_new: Employee;
  employee?: Employee;

  constructor(private feedbackService: FeedbackService, private builder: FormBuilder) {
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
