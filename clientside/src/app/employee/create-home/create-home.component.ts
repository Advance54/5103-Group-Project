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
 employees: Array<Employee>;
 tempcompanyemployees: Array<Employee>;
 tempemailemployees: Array<Employee>;
 newEmployee: Employee;
 msg: string;
 createForm: FormGroup;
 private router = inject(Router);
 email: FormControl;
 password: FormControl;
 firstlast: FormControl;
 company: FormControl;
  incorrect: boolean;
 constructor(public employeeService: EmployeeService, private builder: FormBuilder) {
 this.employees = [];
 this.tempcompanyemployees = [];
 this.tempemailemployees = [];
 this.newEmployee=
 {
  id: 0,
  title: '',
  firstlast: '',
  company: '',
  password: '',
  email: '',
 }
 this.msg = '';
 this.incorrect = false;
 this.email = new FormControl('', Validators.compose([Validators.required]));
 this.password = new FormControl('', Validators.compose([Validators.required]));
 this.firstlast = new FormControl('', Validators.compose([Validators.required]));
 this.company = new FormControl('', Validators.compose([Validators.required]));
 this.createForm = new FormGroup({
  email: this.email,
  firstlast: this.firstlast,
  company: this.company,
  password: this.password,
 })
 } // constructor
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
  })

 this.employeeService.getAll().subscribe({
 // Observer object, complete method intrinscally unsubscribes
 next: (payload: any) => {
 this.employees = payload;
console.log(this.employees[0])
 this.msg = 'Account Creation';
 },
 error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
 complete: () => {},
 }); // subscribe
 } // ngOnInit
 CreateAccountFunction(): void{
  console.log(this.company.value)
  this.tempcompanyemployees = this.employees.filter(item => item.company.toLowerCase() == this.company.value.toLowerCase())
  this.tempemailemployees = this.employees.filter(item => item.email.toLowerCase() == this.email.value.toLowerCase())
//  this.tempemployees.filter(item => console.log(item.company.toLowerCase()))
//  console.log(this.tempemployees)
 //fanshawe
//  .filter(item =>
//   console.log(item.company.toLowerCase() == this.company.value.toLowerCase())
//   );
  // console.log(this.employees)
  // console.log(this.tempemployees)
  if(this.tempcompanyemployees.length > 0 || this.tempemailemployees.length > 0){
      console.log("Taken")
      // sessionStorage.setItem("login",JSON. stringify(this.employees.filter(item =>
      //   item.email.toLowerCase() == this.email.value.toLowerCase() && item.password == this.password.value )))
      this.incorrect = true;
      // this.router.navigate(['/employees']);
    }
    else{
      this.incorrect = false;
      this.newEmployee.title = "Manager"
      this.newEmployee.company = this.company.value
      this.newEmployee.email = this.email.value.toLowerCase()
      this.newEmployee.firstlast = this.firstlast.value
      this.newEmployee.password = this.password.value
      this.add(this.newEmployee)
      this.router.navigate(['/']);
      // console.log(this.employees.at(0))
      // console.log(this.employees.filter(item =>
      //   item.company.toLowerCase() == this.company.value.toLowerCase()))
    }

 }
 add(employee: Employee): void {
  employee.id = 0;
  this.employeeService.create(employee).subscribe({
  // Create observer object
  next: (emp: Employee) => {
    this.msg = `Employee ${emp.id} added!`;
  },
  error: (err: Error) =>
    (this.msg = `Employee not added! - ${err.message}`),
    complete: () => (console.log("working")),
  });
  }

} // EmployeeHomeComponent
