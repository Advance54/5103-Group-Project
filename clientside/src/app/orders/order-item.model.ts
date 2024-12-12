export interface OrderItem
{
  id: number;
  orderid: number;
  itemid: string;
  qty: number;

  //item_cost in the item.ts
  item_cost: number;
}
