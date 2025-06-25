import { Injectable } from '@angular/core';
import { Product } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor() { }

  getData() {
    // let data: Product = {
    //   code: '1',
    //   name: '1',
    //   category: '1',
    //   quantity: '1',
    // }
    // return data;
  }
}
