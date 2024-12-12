export interface Order
{
  id: number;
  tableNumber: string;
  dateTime: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number
  }>;
  totalPrice: number;
}
