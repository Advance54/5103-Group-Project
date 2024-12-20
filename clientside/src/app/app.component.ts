import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-exercises',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit
{
  title: string = '';
  private router = inject(Router);
  show: boolean = false;

  constructor(private location: Location)
  {
    const path = location.path();
    if (path && path.length > 1)
    {
      let header = path.substring(1, 2).toUpperCase();
      header += path.substring(2);
      this.setTitle(header);
    } else if (path === '')
    {
      this.setTitle('');
    }
  }

  ngOnInit(): void
  {
    if (typeof window !== 'undefined' && sessionStorage.getItem("login"))
    {
      console.log(this.show);
      this.show = true;
    } else
    {
      this.show = false;
      console.log(this.show);
    }
  }

  isLoggedIn(): boolean
  {
    if (sessionStorage.getItem("login") == "")
    {
      return false;
    }

    return true;
  }

  LogoutFunction(): void
  {
    if (typeof window !== 'undefined')
    {
      sessionStorage.setItem("login", "");
      this.router.navigate(['/']);
    }
  }

  setTitle(header: string)
  {
    this.title = header ? header : 'Home';
  }

  // Navegar entre rotas
  navigateTo(route: string): void
  {
    this.router.navigate([`/${ route }`]);
  }
}
