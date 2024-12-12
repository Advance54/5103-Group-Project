import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderService } from './order.service';
import { Order } from './order.model';
import { ItemsService } from '../item/item.service';
import { Item } from '../item/item';

import { MatComponentsModule } from '../mat-components/mat-components.module';

import { OrderAddComponent } from './order-add/order-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, MatComponentsModule, OrderAddComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: true,
})
export class OrdersComponent implements OnInit
{
  private router = inject(Router);

  orders: Order[] = []
  items: Item[] = [];
  showAddComponent: boolean = false;

  constructor(public orderService: OrderService, public itemsService: ItemsService) { }

  ngOnInit(): void
  {
    if (!sessionStorage.getItem("login"))
    {
      this.router.navigate(['/']);

    }

    this.loadOrders();
    this.loadItems();
  }

  loadOrders(): void
  {
    this.orderService.getAll().subscribe({
      next: (orders: Order[]) => this.orders = orders,
      error: (e: Error) => console.log(`Failed to load orders - ${ e.message }`)
    });
  }

  loadItems(): void
  {
    this.itemsService.getAll().subscribe({
      next: (items: Item[]) => this.items = items,
      error: (e: Error) => console.log(`Failed to load items - ${ e.message }`)
    });
  }

  save(order: Order): void
  {
    this.add(order);
  }

  add(order: Order): void
  {
    this.orderService.create(order).subscribe({
      next: (o: Order) =>
      {
        this.loadOrders(); // Refresh table
      },
      error: (e: Error) => console.log(`Add order failed! - ${ e.message }`),
      complete: () => this.showAddComponent = false,
    });
  }

  cancel(): void
  {
    this.showAddComponent = false;
  }

  startNewOrder(): void
  {
    this.showAddComponent = true;
  }
}
