import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginHomeComponent } from './login-home/login-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateHomeComponent } from './create-home/create-home.component';
import { EmployeeSelfEditComponent } from './employee-self-edit/employee-self-edit.component';

@NgModule({
 declarations: [EmployeeListComponent, LoginHomeComponent, CreateHomeComponent, EmployeeSelfEditComponent],
 imports: [CommonModule, MatComponentsModule, ReactiveFormsModule, FormsModule, RouterModule],
})
export class EmployeeModule {}
