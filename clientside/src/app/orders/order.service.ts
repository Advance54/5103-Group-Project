import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { GenericHttpService } from "../generic-http.service";
import { Order } from "./order.model";

@Injectable({
  providedIn: 'root'
})

export class OrderService extends GenericHttpService<Order>
{
  constructor(orderService: HttpClient)
  {
    super(orderService, 'orders');
  }
}
