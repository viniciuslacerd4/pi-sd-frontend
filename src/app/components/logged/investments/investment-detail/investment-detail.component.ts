import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvestmentService } from '../../../../services/investment.service';
import { InvestmentResponse } from '../../../../models/investment-response.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe, DecimalPipe } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-investment-detail',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './investment-detail.component.html',
  styleUrl: './investment-detail.component.css',
})
export class InvestmentDetailComponent implements OnInit, OnDestroy {
  investment: InvestmentResponse;

  investmentSubscription: Subscription;
  sellSubscription: Subscription;

  constructor(
    private investmentService: InvestmentService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.investmentSubscription = this.investmentService
        .findById(+params['id'])
        .subscribe((investment) => {
          this.investment = investment;
        });
    });
  }

  ngOnDestroy(): void {
    this.investmentSubscription?.unsubscribe();
    this.sellSubscription?.unsubscribe();
  }

  sell() {
    this.sellSubscription = this.investmentService
      .sell(this.investment.id)
      .subscribe((investment) => {
        this.investment = investment;
        this.authService.refresh();
      });
  }
}
