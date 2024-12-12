import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericHttpService } from '../generic-http.service';
import { Item } from './item';

@Injectable({
 providedIn: 'root',
})
export class ItemsService extends GenericHttpService<Item> {

  constructor(httpClient: HttpClient) {
  super(httpClient, `items`);
  }
 }
