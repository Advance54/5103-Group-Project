export interface OrderItem
{
  id: number;
  orderid: number;
  itemid: number;
  qty: number;

  name: String;
  description: String;
  //item_cost in the item.ts
  item_cost: number;
}
