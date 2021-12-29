import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService, Product } from 'src/app/services/cart.service';
import productData from '../../../assets/company/menu.json';
import categoryData from '../../../assets/company/categories.json';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  public products = [];
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filterProducts(params.category);
    });
  }

  filterProducts(category = null) {
    if (!category) {
      this.products = productData;
    } else {
      const cat = categoryData.filter((item) => item.slug === category)[0];
      this.products = productData.filter((p) => p.category === cat.id);
    }
  }

  addProduct(product: Product) {
    this.cartService.addProducts(product);
  }
}
