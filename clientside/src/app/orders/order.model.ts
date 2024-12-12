import { OrderItem } from "./order-item.model";

export interface Order
{
  id: number;
  tableNumber: string;
  totalPrice: number;
  dateTime: string;
  items: OrderItem[];
}
