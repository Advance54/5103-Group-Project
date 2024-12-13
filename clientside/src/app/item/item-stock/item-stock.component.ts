import { Component } from '@angular/core';
import {  numberAttribute } from '@angular/core';
import {  Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee/employee.service';
import{ItemsService} from "./../../item/item.service"
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { Employee } from '../../employee/employee';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Item } from '../item';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-item-stock',
  host: { ngSkipHydration: 'true' },
  templateUrl: './item-stock.component.html',

})
export class ItemStockComponent implements OnInit{
  email: FormControl;
  @Output() selected = new EventEmitter();
  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>();
  password: FormControl;
  items: Array<Item>;
  selectedi: Item;
  item_d: Item;
  loginForm: FormGroup;
  private router = inject(Router);
  counter: number = 0;
  msg: string;
  employees: Array<Employee>;
  employee?: Employee;
hideEditForm: boolean;
  constructor(private builder: FormBuilder, public employeeService: EmployeeService, public itemService: ItemsService) {
    this.employees = [];
    this.items = [];
    this.employee = {
      id: 0,
      title: '',
      firstlast: '',
      company: '',
      password: '',
      email: '',
      };
      this.item_d = {
        id: 0,
        item_name: "",
        amount: 0,
        description: "",
        item_order_cost: 0,
        item_cost: 0}
      this.selectedi ={
        id: 0,
        item_name: "",
        amount: 0,
        description: "",
        item_order_cost: 0,
        item_cost: 0}
      this.msg = '';
      this.hideEditForm = true;

  this.email = new FormControl('', Validators.compose([Validators.required]));
  this.password = new FormControl('', Validators.compose([Validators.required]));
  this.loginForm = new FormGroup({
    password: this.password,
    email: this.email,
  });
  }

  delete(item: Item): void {
    console.log(item.id);
    this.itemService.delete(item.id).subscribe({
    next: (rowsUpdated: number) => {
    this.msg = rowsUpdated === 1
    ? `Product ${item.id} deleted!`
    : `Product ${item.id} not deleted!`;
    this.getAllProducts(false);

    },
    error: (e: Error) => (this.msg = `Delete failed! - ${e.message}`),
    complete: () => {location.reload();}
    //http://localhost:4200/items

    ,
    });
    }
    getAllProducts(verbose: boolean = true): void {
      this.itemService.getAll().subscribe({
      next: (items: Item[]) => {this.dataSource.data = items},
      error: (e: Error) => this.msg = `Failed to load items - ${e.message}`,

      });
      }
  ngOnInit(): void {
//    console.log(sessionStorage.getItem("login"))

    //this.msg = `${} `
    if(sessionStorage.getItem("login")){
      // console.log(sessionStorage.getItem("login"))
      this.employee = JSON.parse(sessionStorage.getItem("login")|| '{}')
      console.log(this.employee)
      this.msg = `Welcome to ${this.employee?.company}'s Stock page!`
      //console.log(this.msg)
    }
    else{
      this.router.navigate(['/']);
    }

    this.employeeService.getAll().subscribe({
      // Observer object, complete method intrinscally unsubscribes
      next: (payload: any) => {
      this.employees = payload;
     //console.log(this.employees)

      },
      error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
      complete: () => {},
      }); // subscribe
      this.itemService.getAll().subscribe({
        // Observer object, complete method intrinscally unsubscribes
        next: (payload: any) => {
        this.items = payload;
        console.log(payload[0].id
        )

        },
        error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
        complete: () => {},
        }); // subscribe



  }

  LogoutFunction(): void{
    this.hideEditForm = !this.hideEditForm
  }
  GetItemsList():Item[]{
    //console.log(this.employees.filter(loggedin =>  loggedin.firstlast !== this.employee?.firstlast))



    return this.items

  }
  startNewItem(): void {
    this.selectedi = Object.assign({}, this.item_d);
    this.msg = 'New Item';
    this.hideEditForm = !this.hideEditForm
    }
  add(item: Item): void {
    item.id = 0;
  this.itemService.create(item).subscribe({
  // Create observer object
  next: (emp: Item) => {
  this.msg = `item ${emp.id} added!`;
  },
  error: (err: Error) =>
  (this.msg = `Vendor not added! - ${err.message}`),
  complete: () => (this.hideEditForm = !this.hideEditForm),
  });
  window.location.reload();
  } // add
  update(item: Item): void {
    this.itemService.update(item).subscribe({
    // Create observer object
    next: (emp: Item) => (this.msg = `Item ${emp.item_name} updated!`),
    error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
    complete: () => (this.hideEditForm = !this.hideEditForm),
    });
    } // update
  save(item: Item): void {

    item.id ? this.update(item) : this.add(item)

    } // save
//item_d
  GetItemDetails(item: Item){
    //alert(item.item_name)
    this.selectedi =item
    this.hideEditForm = !this.hideEditForm;

  }

}
