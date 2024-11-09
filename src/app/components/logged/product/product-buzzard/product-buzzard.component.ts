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
import { CustomValidators } from '../../../../utils/custom-validators';
import { ToastService } from '../../../../services/toast.service';

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

  get insufficientBalance() {
    const amount = this.formgroup.get('amount').value;
    return amount > this.balanceService.balance$.value;
  }

  get amountInvalid() {
    const amount = this.formgroup.get('amount');
    return amount.invalid && (amount.touched || amount.dirty);
  }

  constructor(
    private productService: ProductService,
    private investmentService: InvestmentService,
    private balanceService: BalanceService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.formgroup = this.formBuilder.group({
      amount: [
        '',
        [
          Validators.required,
          CustomValidators.keyedPattern(/^[0-9]+(\.[0-9]{1,2})?$/, 'number'),
          Validators.min(0.1),
        ],
      ],
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
        this.toastService.addToast({
          title: 'Sucesso',
          message: 'Investimento realizado com sucesso',
          type: 'success',
          timeout: 5000,
        });
        this.balanceService.updateBalance();
        this.router.navigate(['/investments']);
      },
      error: (error) => {
        this.toastService.addToast({
          title: 'Erro',
          message: error.error.message,
          type: 'error',
          timeout: 5000,
        });
      },
    });
  }
}
