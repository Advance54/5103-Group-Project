import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FeedbackService } from '../../feedback/feedback.service'; // Caminho corrigido

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss'],
})
export class LoginHomeComponent implements OnInit {
  loginForm: FormGroup;
  feedbackForm: FormGroup;
  incorrect: boolean = false;
  msg: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private feedbackService: FeedbackService
  ) {
    // Formulário de Login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Formulário de Feedback
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  LoginFunction(): void {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    this.employeeService.getEmployees().subscribe({
      next: (employees: any[]) => {
        const employee = employees.find(
          (emp: { email: string; password: string }) =>
            emp.email === email && emp.password === password
        );

        if (employee) {
          sessionStorage.setItem('login', JSON.stringify(employee));
          this.router.navigate(['/']);
        } else {
          this.incorrect = true;
          this.msg = 'Wrong email or password. Please try again.';
        }
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        alert('Login failed. Please try again later.');
      },
    });
  } else {
    this.msg = 'Please fill in all required fields.';
    this.incorrect = true;
  }
}


  CreateFunction(): void {
    this.router.navigate(['/create-account']);
  }

sendFeedback(): void {
  if (this.feedbackForm.valid) {
    const feedback = {
      ...this.feedbackForm.value,
      date: new Date(), // Adiciona data e hora
    };

    this.feedbackService.saveFeedback(feedback).subscribe({
      next: () => {
        alert('Feedback sent successfully!'); // Exibe mensagem de sucesso
        this.clearFeedback(); // Reseta os campos
      },
      error: (err) => {
        console.error('Error sending feedback:', err);
        alert('Failed to send feedback. Please try again.');
      },
    });
  }
}


  clearFeedback(): void {
    this.feedbackForm.reset();
  }
}
