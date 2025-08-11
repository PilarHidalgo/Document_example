import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: any[] = [];
  newItemName: string = '';
  editItemId: number | null = null;
  editItemName: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.http.get<any[]>('http://localhost:3000/items')
      .subscribe(data => {
        this.items = data;
      });
  }

  addItem(): void {
    this.http.post('http://localhost:3000/items', { name: this.newItemName })
      .subscribe(() => {
        this.newItemName = '';
        this.fetchItems();
      });
  }

  updateItem(id: number): void {
    this.http.put(`http://localhost:3000/items/${id}`, { name: this.editItemName })
      .subscribe(() => {
        this.editItemId = null;
        this.editItemName = '';
        this.fetchItems();
      });
  }

  deleteItem(id: number): void {
    this.http.delete(`http://localhost:3000/items/${id}`)
      .subscribe(() => {
        this.fetchItems();
      });
  }

  setEditItem(item: any): void {
    this.editItemId = item.id;
    this.editItemName = item.name;
  }
}
