import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Array<{
    id: number;
    tableNumber: string;
    dateTime: string;
    items: Array<{ name: string; quantity: number; unitPrice: number }>;
    totalPrice: number;
  }> = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.http.get('/api/orders').subscribe((data: any) => {
      this.orders = data;
    });
  }
}
