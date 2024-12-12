import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { inject } from '@angular/core';
@Component({
selector: 'app-exercises',
templateUrl: './app.component.html',
styleUrl: './app.component.scss'
})
//[disabled]="!employeeForm.valid"
export class AppComponent implements OnInit {
title: string = '';
private router = inject(Router);
show: boolean = false;
constructor(private location: Location) {
let path = location.path();
if (path && path.length > 1) {
let header = path.substring(1, 2).toUpperCase();
header += path.substring(2);
this.setTitle(header);
}
else if (path === '') {
this.setTitle('');
}
}
  ngOnInit(): void {
    if(sessionStorage.getItem("login")){
      console.log( this.show)
      this.show = true
    }
    else{
      this.show = false
      console.log( this.show)
    }

  }
  //trying to currently research how to fix this AGAIN, no idea why it's throwing errors but working
  //I cannot solve this, it works so I'll leave it
LogoutFunction(): void{
  sessionStorage.setItem("login", "")
  this.router.navigate(['/']);
}
ItemFunction(): void{

  this.router.navigate(['/items']);
}
EmployeeFunction(): void{

  this.router.navigate(['/employees']);
}
ProfileFunction(): void{
console.log("testing")
  this.router.navigate(['/profile']);
}
setTitle(header: string) {
this.title = header ? header : 'Home';

}

}
