import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: string;
  price: string;
  img: string;
  title: string;
  desc: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = {};
  private cartItems = new BehaviorSubject(0);
  constructor() {}

  addProducts(product: Product) {
    if (!this.cart[product.id]) {
      this.cart[product.id] = {
        amount: 1,
        ...product,
      };
    } else {
      this.cart[product.id].amount += 1;
    }

    this.cartItems.next(this.cartItems.value + 1);
  }

  getCartCount() {
    return this.cartItems.asObservable();
  }

  getCart() {
    const cartItems = [];
    for (const [key, value] of Object.entries(this.cart)) {
      cartItems.push(value);
    }

    return cartItems;
  }
}
