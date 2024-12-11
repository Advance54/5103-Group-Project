import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// added MaterialUI imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LogoutpageComponent } from './loginpage/logoutpage.component';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatComponentsModule } from './mat-components/mat-components.module';
import { EmployeeModule } from './employee/employee.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
<<<<<<< HEAD

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { AddEmployeeComponent } from './addemployee/add-employee.component';


=======
>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
//mat-label
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
<<<<<<< HEAD
    LogoutpageComponent,
    MenuComponent,
    OrdersComponent,
    AddEmployeeComponent
=======
    LogoutpageComponent
>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatComponentsModule,
    MatFormField,
    MatLabel,
 AppRoutingModule,
 BrowserAnimationsModule,
 MatButtonModule,
 MatMenuModule,
 MatCardModule,
 MatToolbarModule,
 MatIconModule,
 MatListModule,
<<<<<<< HEAD
 EmployeeModule,
    FormsModule,
    CommonModule
=======
 EmployeeModule
>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),

    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
