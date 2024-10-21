import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ProductResponse } from '../../../../models/product-response.model';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { PercentPipe } from '@angular/common';
import { Pageable } from '../../../../models/pageable.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, PercentPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, OnDestroy {
  productPageable: Pageable<ProductResponse> = new Pageable<ProductResponse>();
  subscription: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService.findAll().subscribe((pageable) => {
      this.productPageable = pageable;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
