import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginpageComponent} from "./loginpage/loginpage.component"
const routes: Routes = [
 { path: 'home', component: HomeComponent, title: 'Exercises - Home' },
 { path: 'login', component: LoginpageComponent, title: 'login' },
 { path: '', component: LoginpageComponent, title: 'login' }
];
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
