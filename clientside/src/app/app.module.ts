import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Angular Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// Common and Forms modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Custom components
import { HomeComponent } from './home/home.component';
import { LogoutpageComponent } from './loginpage/logoutpage.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { AddEmployeeComponent } from './addemployee/add-employee.component';

// Feature modules
import { MatComponentsModule } from './mat-components/mat-components.module';
import { EmployeeModule } from './employee/employee.module';

// HTTP Client
import { provideHttpClient, withFetch } from '@angular/common/http';

import { ItemStockComponent } from './item/item-stock/item-stock.component';
import { ItemChangeComponent } from './item/item-change/item-change.component';
//mat-label

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoutpageComponent,

    ItemStockComponent,
    ItemChangeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatComponentsModule,
    EmployeeModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
