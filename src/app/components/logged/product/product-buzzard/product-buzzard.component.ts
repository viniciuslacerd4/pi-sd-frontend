import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InvestmentBuyRequest } from '../../../../models/investment-buy-request.model';
import { ProductResponse } from '../../../../models/product-response.model';
import { BalanceService } from '../../../../services/balance.service';
import { InvestmentService } from '../../../../services/investment.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product-buzzard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-buzzard.component.html',
  styleUrl: './product-buzzard.component.css',
})
export class ProductBuzzardComponent {
  formgroup: FormGroup;
  product: ProductResponse;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private investmentService: InvestmentService,
    private balanceService: BalanceService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formgroup = this.formBuilder.group({
      amount: ['0', [Validators.required, Validators.min(0.01)]],
    });

    this.activatedRoute.params.subscribe((params) => {
      this.subscription = this.productService
        .findById(+params['id'])
        .subscribe((product) => {
          this.product = product;
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFormSubmit() {
    if (this.formgroup.invalid) return;

    const investmentRequest: InvestmentBuyRequest = {
      buyPrice: this.formgroup.value.amount,
      productId: this.product.id,
    };

    this.investmentService.buy(investmentRequest).subscribe({
      next: () => {
        this.balanceService.updateBalance();
        this.router.navigate(['/investments']);
      },
      error: (error) => {
        console.log('Error investing: ' + error);
      },
    });
  }
}
