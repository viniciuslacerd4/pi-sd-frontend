import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ProductResponse } from '../../../../models/product-response.model';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, PercentPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: ProductResponse[] = [];
  subscription: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService.findAll().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
