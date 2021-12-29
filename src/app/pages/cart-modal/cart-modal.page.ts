import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  public cart = [];
  public cartSum = 0;
  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartSum = this.cart.reduce((val, item) => (val += +item.price), 0);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
