import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { CartModalPage } from 'src/app/pages/cart-modal/cart-modal.page';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() categories: any[];
  @ViewChild('productbtn', { read: ElementRef }) productbtn: ElementRef;
  @ViewChild('cartbtnweb', { read: ElementRef }) cartBtnWeb: ElementRef;
  @ViewChild('cartbtnmobile', { read: ElementRef }) cartBtnMobile: ElementRef;

  public dropdown = false;
  public cartCount = 0;
  public darkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  constructor(
    private animationCtrl: AnimationController,
    private cartService: CartService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cartService.getCartCount().subscribe((value) => {
      if (value > 0) {
        this.animateCart();
      }
      this.cartCount = value;
    });

    this.toggleDarkmode(this.darkMode);

    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // prefersDark.addEventListener('change', (e) => {
    //   const dark = e.matches ? true : false;

    //   if (this.darkMode != dark) {
    //     this.darkMode = !this.darkMode;
    //     this.toggleDarkmode(this.darkMode);
    //   }
    // });
  }

  toggleDarkmode(enable) {
    this.darkMode = enable;

    document.body.classList.toggle('dark', enable);
  }

  hideDropdown(event) {
    const xTouch = event.clientX;
    const yTouch = event.clientY;

    const rect = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top + 2;
    const leftBoundary = rect.left + 2;
    const rightBoundary = rect.right - 2;

    if (
      xTouch < leftBoundary ||
      xTouch > rightBoundary ||
      yTouch < topBoundary
    ) {
      this.dropdown = false;
    }
  }

  animateCart() {
    const keyframes = [
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.5, transform: 'scale(1.2)' },
      { offset: 0.8, transform: 'scale(0.9)' },
      { offset: 1, transform: 'scale(1)' },
    ];

    const cartAnimationWeb = this.animationCtrl
      .create('web')
      .addElement(this.cartBtnWeb.nativeElement)
      .duration(600)
      .keyframes(keyframes);

    cartAnimationWeb.play();

    const cartAnimationMobile = this.animationCtrl
      .create('mobile')
      .addElement(this.cartBtnMobile.nativeElement)
      .duration(600)
      .keyframes(keyframes);
    cartAnimationMobile.play();
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'custom-modal',
    });

    await modal.present();
  }
}
