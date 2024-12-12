import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit
{
  menuItems: Array<{ name: string; price: number }> = [];
  newItem = { name: '', price: 0 };

  constructor(private http: HttpClient) { }

  ngOnInit(): void
  {
    this.loadMenuItems();
  }

  loadMenuItems(): void
  {
    this.http.get('/api/menu').subscribe((data: any) =>
    {
      this.menuItems = data;
    });
  }

  addItem(): void
  {
    this.http.post('/api/menu', this.newItem).subscribe(() =>
    {
      this.menuItems.push({ ...this.newItem });
      this.newItem = { name: '', price: 0 };
    });
  }

  editItem(index: number): void
  {
    const updatedItem = prompt(
      'Edit item name and price (format: name,price):',
      `${ this.menuItems[index].name },${ this.menuItems[index].price }`
    );

    if (updatedItem)
    {
      const [name, price] = updatedItem.split(',');
      this.menuItems[index].name = name;
      this.menuItems[index].price = +price;

      this.http.put(`/api/menu/${ index }`, this.menuItems[index]).subscribe();
    }
  }

  removeItem(index: number): void
  {
    this.http.delete(`/api/menu/${ index }`).subscribe(() =>
    {
      this.menuItems.splice(index, 1);
    });
  }
}
