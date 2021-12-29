import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import productData from '../../../assets/company/menu.json';
import categoryData from '../../../assets/company/categories.json';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public product = null;
  public category = null;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = productData.filter((p) => p.id === id)[0];
    this.category = categoryData.filter(
      (c) => c.id === this.product.category
    )[0];
  }

  addToCart() {
    this.cartService.addProduct(this.product);
  }
}
