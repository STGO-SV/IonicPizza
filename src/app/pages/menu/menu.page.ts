import { Component, HostListener, OnInit } from '@angular/core';
import { isPlatform, MenuController, Platform } from '@ionic/angular';

import categoryData from '../../../assets/company/categories.json';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menuItems = [
    {
      title: 'Inicio',
      icon: 'home',
      path: '/',
    },
    {
      title: 'Productos',
      icon: 'list',
      path: '/products',
      children: categoryData,
    },
    {
      title: 'Acerca de',
      icon: 'information',
      path: '/about',
    },
  ];

  public title = 'Inicio';
  public categories = categoryData;
  constructor(private plt: Platform, private menuCtrl: MenuController) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const newWidth = event.target.innerWidth;
    this.toggleMenu(newWidth);
  }

  ngOnInit() {
    const headerHeight = isPlatform('ios') ? 44 : 56;
    document.documentElement.style.setProperty(
      '--header-height',
      `${headerHeight}px`
    );
    const width = this.plt.width();
    this.toggleMenu(width);
  }

  toggleMenu(width) {
    if (width > 768) {
      this.menuCtrl.enable(false, 'myMenu');
    } else {
      this.menuCtrl.enable(true, 'myMenu');
    }
  }

  setTitle(title: string) {
    this.title = title;
  }
}
