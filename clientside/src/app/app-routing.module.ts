import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importação dos componentes utilizados nas rotas
import { HomeComponent } from './home/home.component';
import { LogoutpageComponent } from './loginpage/logoutpage.component';
import { CreateHomeComponent } from './employee/create-home/create-home.component';
import { LoginHomeComponent } from './employee/login-home/login-home.component';
import { ItemStockComponent } from './item/item-stock/item-stock.component';
import { EmployeeSelfEditComponent } from './employee/employee-self-edit/employee-self-edit.component';
import { OrdersComponent } from './orders/orders.component';

// Definição das rotas
const routes: Routes = [
  { path: '', component: LoginHomeComponent, title: 'Login' }, // Página inicial/login
  { path: 'home', component: HomeComponent, title: 'Home' }, // Página principal
  { path: 'employees', component: LogoutpageComponent, title: 'Employees' }, // Lista de funcionários
  { path: 'items', component: ItemStockComponent, title: 'Items' }, // Estoque de itens
  { path: 'create-account', component: CreateHomeComponent, title: 'Create Account' }, // Página de criação de conta
  { path: 'profile', component: EmployeeSelfEditComponent, title: 'Profile' }, // Página de perfil
  { path: 'orders', component: OrdersComponent, title: 'Orders' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
