import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductResponse } from '../../../../models/product-response.model';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InvestmentRequest } from '../../../../models/investment-request.model';
import { InvestmentService } from '../../../../services/investment.service';
import { AuthService } from '../../../../services/auth.service';

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
    private authService: AuthService,
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

    const investmentRequest: InvestmentRequest = {
      buyPrice: this.formgroup.value.amount,
      productId: this.product.id,
    };

    this.investmentService.create(investmentRequest).subscribe({
      next: () => {
        this.authService.refresh();
        this.router.navigate(['/investments']);
      },
      error: (error) => {
        console.log('Error investing: ' + error);
      },
    });
  }
}
