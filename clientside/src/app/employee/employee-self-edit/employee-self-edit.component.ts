import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-self-edit',
  templateUrl: './employee-self-edit.component.html',

})
export class EmployeeSelfEditComponent implements OnInit{
  private router = inject(Router);
  employees: Employee[] = [];
  tempemployees: Employee[] = [];
  employee?: Employee;
  tempemployee?: Employee;
  Form: FormGroup;
  title: FormControl;
  firstlast: FormControl;
  password: FormControl;
  email: FormControl;
  msg: string;
  constructor(private builder: FormBuilder, public employeeService: EmployeeService) {
    this.employee = {
      id: 0,
      title: '',
      firstlast: '',
      company: '',
      password: '',
      email: '',
      };
      this.tempemployee = {
        id: 0,
        title: '',
        firstlast: '',
        company: '',
        password: '',
        email: '',
        };
      this.msg = ""
      this.title =  new FormControl('', Validators.compose([Validators.required]));
      this.firstlast =  new FormControl('', Validators.compose([Validators.required]));
      this.password =  new FormControl('', Validators.compose([Validators.required]));
      this.email =  new FormControl('', Validators.compose([Validators.required]));
      this.Form = new FormGroup({
        title: this.title,
        firstlast: this.firstlast,
        password: this.password,
        email: this.email,
        //item_cost: this.item_cost,
      })
    }







  ngOnInit(): void {

    this.msg = ""
    //this.msg = `${} `
    if(sessionStorage.getItem("login")){

      this.tempemployee = JSON.parse(sessionStorage.getItem("login")|| '{}')

      this.employeeService.getAll().subscribe({
        next: (payload: any) => {
        this.tempemployees = payload;

        this.employees = this.tempemployees.filter(item => (item.id == this.tempemployee?.id ) )

       console.log(this.employees[0])
        this.employee = this.employees[0]
        console.log(this.employee)

        },
        error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
        complete: () => {
          this.Form.patchValue({

            title: this.employee?.title,
            firstlast: this.employee?.firstlast,
            password: this.employee?.password,
            email: this.employee?.email,
          });
        },
        }); // subscribe



    }
    else{
      this.router.navigate(['/']);
    }
  }
  update(self: Employee): void {
    this.employeeService.update(self).subscribe({
    next: () => (this.msg = `You've updated yourself ${self.firstlast}!`),
    error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),

    });
    } // update
  updateProfile(): void {
    if(this.employee){

      this.employee.title = this.Form.getRawValue().title;
      this.employee.firstlast = this.Form.getRawValue().firstlast;
      this.employee.password = this.Form.getRawValue().password;
      this.employee.email = this.Form.getRawValue().email;

      this.update(this.employee)


    }



  }


}

