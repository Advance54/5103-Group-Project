import { Component } from '@angular/core';
import {  Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styles: ``
})
export class LoginpageComponent {
  email: FormControl;
  loginForm: FormGroup;
  constructor(private builder: FormBuilder) {

  this.email = new FormControl('', Validators.compose([Validators.required]));
  this.loginForm = new FormGroup({

  email: this.email,
  });
  } // constructor
}
