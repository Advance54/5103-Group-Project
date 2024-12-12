import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-exercises',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = '';
  private router = inject(Router);
  show: boolean = false;

  constructor(private location: Location) {
    const path = location.path();
    if (path && path.length > 1) {
      let header = path.substring(1, 2).toUpperCase();
      header += path.substring(2);
      this.setTitle(header);
    } else if (path === '') {
      this.setTitle('');
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && sessionStorage.getItem("login")) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem("login") !== "";
  }

  LogoutFunction(): void {
    sessionStorage.setItem("login", "");
    this.router.navigate(['/']);
  }

  ItemFunction(): void {
    this.router.navigate(['/items']);
  }

  EmployeeFunction(): void {
    this.router.navigate(['/employees']);
  }

  ProfileFunction(): void {
    this.router.navigate(['/profile']);
  }

  setTitle(header: string): void {
    this.title = header ? header : 'Home';
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}
